const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/userRouter')

// App

const app = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


// Routes
app.use('/', indexRouter)
app.use('/user',userRouter)

app.get('/', ()=> {
    console.log('hi!')
})

module.exports = app;