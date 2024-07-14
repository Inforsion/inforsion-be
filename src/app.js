const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')

const indexRouter = require('./routes/indexRouter')
const userRouter = require('./routes/authRouter')
const storeRouter = require('./routes/storeRouter')

const path = require("path");
const errorHandler = require("./middlewares/errorMiddleware");
const setupPassport = require('./config/passport')
const db = require('./models/index');
const cors = require('cors')
const corsOption = require('./config/cors.config')
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
app.use(cors(corsOption))

// Routes
app.use('/', indexRouter)
app.use('/auth',userRouter)
app.use('/store',storeRouter)

app.get('/', ()=> {
    console.log('hi!')
})

// Error Handle Middleware
app.use(errorHandler)

module.exports = app;