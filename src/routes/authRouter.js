// routes/authRouter.js
const express = require('express')
const authRouter = express.Router();

// controller
const {register, login} = require('../controllers/auth.controller')

// auth/
authRouter.post('/signup', register)
authRouter.post('/login', login)

module.exports = authRouter