const errorHandler = (err, req, res, next) => {
    console.error(err)

    // JWT 인증 에러
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    // 404 에러
    if(err.code === 404) {
        return res.status(404).json({
            status: 'error',
            message: '잘못된 요청 경로입니다.'
        })
    }

    res.status(500).send(err.message)
}

module.exports = errorHandler