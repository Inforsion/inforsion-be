const {createStoreService, StoreServiceError,getStoreService, deleteStoreService} = require("../services/store.service");
const e = require("express");


async function createStore(req, res, next) {
    try {
        const { name, location, description, phoneNumber, email, openingHours } = req.body;
        const userId = req.user.id;

        const response = await createStoreService(name, location, description, phoneNumber, email, openingHours, userId)
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

// 하나의 유저가 생성한 모든 가게의 정보
async function getStores(req,res,next) {
    try {
        const userId = req.user.id
        const storeList = await getStoreService(userId)
        if(storeList) {
            res.status(200).json({
                message: "가게를 목록입니다.",
                storeList: storeList
            })
        } else {
            res.status(400).json({
                message: "가게를 목록이 없습니다.",
                storeList: []
            })
        }
    } catch (e) {
        next(e)
    }
}

// 수정
async function updateStore() {

}

// 삭제
async function deleteStore(req,res,next) {
    try {
        const userId = req.user.id;
        const storeId = req.body.storeId;
        const store = await deleteStoreService(userId, storeId)
        console.log(store)
        if(store) {
            res.status(200).json({
                message: "가게를 성공적으로 삭제했습니다.",
                storeId: store.id
            })
        } else {
            res.status(400).json({
                message: "삭제할 가게가 없습니다.",
                storeId: -1
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = { createStore, getStores ,updateStore,deleteStore}