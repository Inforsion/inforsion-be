const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')
const path = require("path");

// App

const app = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/', express.static(path.join(__dirname,'public')))

// Routes
app.use('/', indexRouter)
app.use('/user',userRouter)

app.get('/', ()=> {
    console.log('hi!')
})

// Error Handle Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err)

    // JWT 인증 에러
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    res.status(500).send(err.message)
}
app.use(errorHandler)

module.exports = app;