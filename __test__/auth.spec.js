const request = require('supertest');
const { register } = require('../src/controllers/auth.controller');

const app = require('../src/app');

describe('인증 테스트', () => {
  test('회원가입 api 잘못된 요청 형식일 경우 400을 반환한다.', async () => {
    request(app).post('/auth/signup').send({}).expect(400);
  });

  test('회원가입 api 요청이 올바르면 201을 반환한다.', async () => {
    request(app).post('/auth/signup').send({
      username: 'test',
      email: 'test@naver.com',
      password: 'test',
    });
  });
});
