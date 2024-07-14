const {createStoreService, StoreServiceError} = require("../services/store.service");


async function createStore(req, res, next) {
    try {
        const { name, location, description, phoneNumber, email, openingHours } = req.body;

        const response = await createStoreService(name, location, description, phoneNumber, email, openingHours)
        if(response) {
            res.status(201).json({
                message: '스토어가 정상적으로 생성되었습니다.',
                storeInfo: response
            })
        }

    } catch (e) {
        console.error('스토어 생성 중 문제',e.message)
        res.status(400).json({
            message: '스토어 생성 중 문제 발생',
            cause: e.message
        })
        next(e);
    }
}

module.exports = { createStore }