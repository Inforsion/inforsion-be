// routes/userRouter.js
const express = require('express')
const userRouter = express.Router();

const pool = require('../config/db')

// controller
const {register} = require('../controllers/user.controller')
userRouter.post('/signup', register)

userRouter.post('/login', (req, res)=> {
    res.send('로그인 요청')
})

module.exports = userRouter