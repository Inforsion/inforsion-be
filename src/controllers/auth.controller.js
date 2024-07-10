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

async function login(req, res, next){
    try {
        //인증 과정
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                res.status(400).json({message: info ? info : '로그인 실패'})
                return;
            }

            let accessToken = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
            )

            if(accessToken) {
                res.status(200).json({
                    message: '로그인 성공!',
                    accessToken: accessToken
                })
            }
        })(req,res,next)
    } catch (error) {
        next(error)
    }
}


module.exports = { register , login};