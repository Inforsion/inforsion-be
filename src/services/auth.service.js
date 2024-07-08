const bcrypt = require('bcrypt');
const passport = require("passport");
const jwt = require('jsonwebtoken')
const {User} = require('../models')

async function registerUser(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        return newUser;
    } catch (e) {
        console.error('auth.service 에러',e)
    }
}

async function loginUser(email, password) {
    let token;
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            throw Error(info ? info.message : 'Login failed')
        }

         token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
        )
    });

    if(token) {
        return token;
    } else {
        return null;
    }
}

module.exports = { registerUser,loginUser };