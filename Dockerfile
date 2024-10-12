# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# TypeScript 컴파일을 위해 개발 의존성을 포함시킵니다.
ENV NODE_ENV production

WORKDIR /usr/src/app

# 모든 의존성을 설치합니다 (개발 의존성 포함)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# 소스 파일을 복사합니다.
COPY . .

# TypeScript를 컴파일합니다.
RUN npm run build

# 프로덕션에 불필요한 파일들을 제거합니다.
RUN npm prune --production

# 실행 권한을 변경합니다.
USER node

EXPOSE 8090

# 컴파일된 JavaScript 파일을 실행합니다.
CMD ["node", "dist/bin/www"]