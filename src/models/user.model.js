const bcrypt = require('bcrypt');
const pool = require('../config/db');


async function createUserTable() {
    let connection;
    try {
        connection = await pool.getConnection();

        // 테이블이 존재하지 않을 경우에만 생성
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('유저 테이블이 성공적으로 생성되었거나 이미 존재합니다.');
    } catch (error) {
        console.error('유저 테이블 생성 실패:', error.message);
        throw error; // 에러를 상위로 전파
    } finally {
        if (connection) connection.release(); // 연결 해제
    }
}

async function createUser(username, email, hashedPassword) {
    let connection;
    try {
        connection = await pool.getConnection();

        // 트랜잭션 시작
        await connection.beginTransaction();

        // 이메일 중복 확인
        const [emailCheck] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (emailCheck.length > 0) {
            throw new Error('이미 사용 중인 이메일입니다.');
        }

        // 사용자 생성
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // 트랜잭션 커밋
        await connection.commit();

        console.log('사용자가 성공적으로 생성되었습니다.');
        return result.insertId;
    } catch (error) {
        // 트랜잭션 롤백
        if (connection) await connection.rollback();
        console.error('유저 회원가입 실패:', error.message);
        throw error; // 에러를 상위로 전파
    } finally {
        if (connection) connection.release(); // 연결 해제
    }
}

module.exports = { createUser };