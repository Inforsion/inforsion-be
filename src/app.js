const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const morgan = require('morgan')
const connectWithRetry = require("./utils/dbConnection");

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


connectWithRetry()
    .then(() => {
        console.log('Inforsion Server가 작동 중입니다...');
    })
    .catch(err => {
        console.error('예기치 못한 오류 발생:', err);
        process.exit(1);
    });

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