const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const { User } = require('../models/user')
const bcrypt = require('bcrypt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}),
    async (email, password, done) => {
    try {
        const user = await User.findOne({ email: {email}});
        if(!user) {
            return done(null, false, { message: 'Incorrect email.'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return done(null, false, { message: 'Incorrect password. '})
        }
        return done(null, user)
    } catch (e) {
        return done(e)
    }
    })

passport.use(new JwtStrategy(opts, async (jwt_payload, done)=> {
    try {
        const user = await User.findOne(jwt_payload.email)

        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (e) {
        return done(e, false)
    }
}))

// Passport 설정 함수
const setupPassport = (app) => {
    app.use(passport.initialize())
}

module.exports = setupPassport