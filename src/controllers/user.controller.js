const userService = require('../services/user.service');

async function register(req, res, next) {
    try {
        const { username,email, password } = await req.body;

        console.log( req.body)
        const userId = await userService.registerUser(username, email, password);
        res.status(201).json({ userId });
    } catch (error) {
        next(error)
    }
}

module.exports = { register };