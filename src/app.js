const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/authRouter')
const path = require("path");
const errorHandler = require("./middlewares/errorMiddleware");
const setupPassport = require('./config/passport')
const db = require('./models/index');

// App
const app = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080)
db.sequelize.sync({force: false})
    .then(()=> {
        console.log('DB 연결 성공')
    }).catch((err)=> {
    console.error(err)
})

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/', express.static(path.join(__dirname,'public')))
setupPassport(app)

// Routes
app.use('/', indexRouter)
app.use('/auth',userRouter)

app.get('/', ()=> {
    console.log('hi!')
})

// Error Handle Middleware
app.use(errorHandler)

module.exports = app;