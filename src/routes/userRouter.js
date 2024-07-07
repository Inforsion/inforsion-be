// routes/userRouter.js
const express = require('express')
const userRouter = express.Router();

const pool = require('../config/db')

async function createUserWithEmailAndPassword() {
    try {
        const connection =  await pool.getConnection();
        console.log('db 연결 성공')
        console.log(connection)
    } catch (e) {
        console.error('유저 회원가입 실패', e)
    }
}
userRouter.post('/signup', (req, res)=> {
    const response = createUserWithEmailAndPassword()
    console.log(response)
    res.json('회원가입 요청')
})

userRouter.post('/login', (req, res)=> {
    res.send('로그인 요청')
})

module.exports = userRouter