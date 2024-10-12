# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app


# 소스 파일 복사
COPY . .
COPY prisma ./prisma


# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm ci
RUN npx prisma generate --schema=./prisma/schema.prisma

# TypeScript 컴파일
RUN npm run build

# 프로덕션에 불필요한 파일 제거
RUN npm prune --production


# 실행 권한 변경
USER node

EXPOSE 8090

# 컴파일된 JavaScript 파일 실행

CMD ["node", "dist/bin/www.js"]