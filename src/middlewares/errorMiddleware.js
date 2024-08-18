const errorHandler = (err, req, res, next) => {
    console.error(err)

    // JWT 인증 에러
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    res.status(500).send(err.message)
}

module.exports = errorHandler