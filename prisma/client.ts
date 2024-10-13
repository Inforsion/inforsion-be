import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabaseConnection() {
  try {
    // 데이터베이스에 간단한 쿼리를 실행합니다.
    await prisma.$queryRaw`SELECT 1`;
    console.log('데이터베이스 연결 성공');
    return true;
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error);
    return false;
  } finally {
    // 연결 확인 후 Prisma 클라이언트를 disconnect 합니다.
    await prisma.$disconnect();
  }
}

// 연결 확인 함수 실행
checkDatabaseConnection()
  .then((isConnected) => {
    if (isConnected) {
      // 연결 성공 시 추가 작업
    } else {
      // 연결 실패 시 추가 작업
    }
  })
  .catch((error) => {
    console.error('연결 확인 중 오류 발생:', error);
  });

export default prisma;
