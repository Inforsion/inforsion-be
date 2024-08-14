

<div align="center" style="margin: 30px">
<img style="border-radius: 100%;overflow: hidden" src="https://avatars.githubusercontent.com/u/175222118?s=200&v=4"/>
</div>

# Inforsion Backend Project

Inforsion 백엔드 프로젝트 리포지토리입니다.


## 프로젝트 설치하기

프로젝트를 설치하기 위한 방법입니다.
1. 터미널에 `git clone https://github.com/Inforsion/inforsion-be.git` 입력해서 프로젝트 클론하기
2. `npm install`로 의존성 패키지 설치하기
3. `npm run dev`로 서버 작동하기
4. 작동하기 위해서는 아래 .env 파일과 DB 서버가 필요합니다.

#### DB 서버
DB서버는 mysql 서버 띄우면 됩니다.. 안될시 연락바람ㅋㅋ

#### env파일 생성
`.env` 파일 생성 후 아래 입력
```text
EXPRESS_PORT=서버포트
DB_HOST=서버호스트
DB_PASSWORD=db비번
JWT_SECRET=jwt시크릿키
```

## 기술 스택
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mysql,sequelize&perline=4)](https://skillicons.dev)

###### 버전
nodejs - 21.7.3

mysql - 8.3.0

