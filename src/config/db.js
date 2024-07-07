const mysql = require('mysql2/promise')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

const testConnection =async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Success to connect with mysql db')
        connection.release()

    } catch (e) {
        console.error('Failed while database connection...', e)
    }
}

testConnection()

module.exports = pool