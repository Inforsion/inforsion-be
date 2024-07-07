const express = require('express')
const dotenv = require('dotenv')
dotenv.config();


// App


const app = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080)

// Middlewares
app.use(express.json() )
app.use(express.urlencoded({extended: false}))



module.exports = app;