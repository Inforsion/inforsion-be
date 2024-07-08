const userService = require('../services/auth.service');

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
        const {email, password} = req.body;
        const accessToken = await userService.loginUser(email, password)
        if(accessToken) {
            res.status(200).json({
                accessToken: accessToken,
                message: '로그인 성공'
            })
        } else {
            res.status(400).json({
                message: '로그인 실패'
            })
        }

    } catch (error) {
        next(error)
    }
}


module.exports = { register , login};