// // import db from '../models';
//
// const MAX_RETRY = 5;
// const RETRY_INTERVAL = 3000;
//
// const connectWithRetry = async (retries = MAX_RETRY) => {
//   try {
//     await db.sequelize.sync({ force: false });
//     console.log('DB 연결 성공');
//   } catch (err) {
//     console.error('DB 연결 실패:', err);
//
//     if (retries > 0) {
//       console.log(
//         `${MAX_RETRY - retries + 1}번째 재시도... (남은 시도: ${retries - 1})`
//       );
//       await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
//       await connectWithRetry(retries - 1);
//     } else {
//       console.error('최대 재시도 횟수 초과. 프로그램을 종료합니다.');
//       process.exit(1);
//     }
//   }
// };
//
// export default connectWithRetry;
