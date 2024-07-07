const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

async function registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.createUser(username, email, hashedPassword);
}

module.exports = { registerUser };