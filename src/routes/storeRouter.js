// routes/authRouter.js
const express = require('express')
const {createStore, getStores, deleteStore, updateStore} = require("../controllers/store.controller");
const storeRouter = express.Router();
const passport = require('passport')

// POST store/create
storeRouter.post('/create', passport.authenticate('jwt', { session: false }),createStore)

// GET store/list/${id}
storeRouter.get(`/list`, passport.authenticate('jwt', { session: false}), getStores)

// PUT store/:id
storeRouter.put('/:id', passport.authenticate('jwt', { session: false}),updateStore)

// DELETE store/:id
storeRouter.delete('/',passport.authenticate('jwt', { session: false}),deleteStore)

module.exports = storeRouter