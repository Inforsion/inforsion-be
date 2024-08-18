// routes/authRouter.js
const express = require('express')
const {createStore} = require("../controllers/store.controller");
const storeRouter = express.Router();
const passport = require('passport')

// POST store/create
storeRouter.post('/create', passport.authenticate('jwt', { session: false }),createStore)



module.exports = storeRouter