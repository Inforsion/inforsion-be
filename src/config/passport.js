const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const { User } = require('../models')
const bcrypt = require('bcrypt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
}

const localVerifyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({where: {email: username}});
        if(!user) {
             done(null, false, { message: '존재하지 않는 사용자입니다. 회원가입을 해주세요.'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
             done(null, false, { message: '올바르지 않은 비밀번호입니다. '})
        }
        done(null, user)
    } catch (e) {
        console.error(e)
         done(e)
    }
}
passport.use('local', new LocalStrategy(localOptions, localVerifyCallback))

passport.use(new JwtStrategy(opts, async (jwt_payload, done)=> {
    try {
        const user = await User.findOne({where: {email:jwt_payload.email}})

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