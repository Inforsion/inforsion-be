# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm ci

# Prisma 관련 파일 복사 및 생성
COPY prisma ./prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# 소스 파일 복사
COPY . .

# TypeScript 컴파일
RUN npm run build

# 프로덕션에 불필요한 파일 제거
RUN npm prune --production


# migrate-and-start.sh 스크립트 복사 및 실행 권한 부여
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

# 소유권 변경
RUN chown -R node:node .

# 실행 권한 변경
USER node

EXPOSE 8090

# 컴파일된 JavaScript 파일 실행
CMD ["/bin/bash", "./wait-for-it.sh", "mysql:3306", "--", "./migrate-and-start.sh"]