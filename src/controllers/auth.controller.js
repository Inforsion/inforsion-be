const userService = require('../services/auth.service');
const passport = require("passport");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
    try {
        const { username,email, password } = req.body;

        const userId = await userService.registerUser(username, email, password);
        if(userId) {
            res.status(201).json({ message: '회원가입 성공' });

        } else {
            res.status(400).json({
                message: '회원가입 실패'
            })
        }
    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: info ? info.message : '로그인 실패'
            });
        }

        try {
            const accessToken = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
            );

            return res.status(200).json({
                message: '로그인 성공!',
                accessToken: accessToken
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}


module.exports = { register , login};