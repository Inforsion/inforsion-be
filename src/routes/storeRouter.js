// routes/authRouter.js
const express = require('express')
const {createStore, getStores} = require("../controllers/store.controller");
const storeRouter = express.Router();
const passport = require('passport')

// POST store/create
storeRouter.post('/create', passport.authenticate('jwt', { session: false }),createStore)

// GET store/list/${id}
storeRouter.get(`/list`, passport.authenticate('jwt', { session: false}), getStores)

module.exports = storeRouter