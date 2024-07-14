// routes/authRouter.js
const express = require('express')
const {createStore} = require("../controllers/store.controller");
const storeRouter = express.Router();


// POST store/create
storeRouter.post('/create',createStore)



module.exports = storeRouter