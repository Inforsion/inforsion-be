const { Store } = require('../models');

class StoreServiceError extends Error {
    constructor(message, type) {
        super(message);
        this.name = 'StoreServiceError';
        this.type = type;
    }
}

async function createStoreService(name, location, description, phoneNumber, email, openingHours) {
    try {
        const data = {
            name,
            location,
            description,
            phoneNumber,
            email,
            openingHours,
        };

        console.log("=>(store.service.js:23) data", data);

        const isMatch = await Store.findOne({where : { name: name}});
        if(isMatch) {
            throw new StoreServiceError('이름이 같은 스토어가 이미 존재합니다.','DUPLICATE_ERROR')
        }

        // 입력값 검증
        if (!name || !location) {
            throw new StoreServiceError('스토어의 이름과 위치는 필수입니다.', 'VALIDATION_ERROR');
        }

        const response = await Store.create(data);
        console.log("=>(store.service.js:24) Store created:", response.id);
        return {id: response.id, name: response.name};
    } catch (error) {
        if (error instanceof StoreServiceError) {
            throw error;
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            throw new StoreServiceError('A store with this name already exists', 'DUPLICATE_ERROR');
        } else {
            console.error("Unexpected error in createStoreService:", error);
            throw new StoreServiceError('An unexpected error occurred while creating the store', 'INTERNAL_ERROR');
        }
    }
}

async function findStoreService(name, location, description, phoneNumber, email, openingHours) {
    try {
        const data = {
            name,
            location,
            description,
            phoneNumber,
            email,
            openingHours,
        };

        console.log("=>(store.service.js:60) data", data);

        const isMatch = await Store.findOne({where : { name: name}});
        if(isMatch) {
            throw new StoreServiceError('이름이 같은 스토어가 이미 존재합니다.','DUPLICATE_ERROR')
        }

        // 입력값 검증
        if (!name || !location) {
            throw new StoreServiceError('스토어의 이름과 위치는 필수입니다.', 'VALIDATION_ERROR');
        }

        const response = await Store.create(data);
        console.log("=>(store.service.js:24) Store created:", response.id);
        return {id: response.id, name: response.name};
    } catch (error) {
        if (error instanceof StoreServiceError) {
            throw error;
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            throw new StoreServiceError('A store with this name already exists', 'DUPLICATE_ERROR');
        } else {
            console.error("Unexpected error in createStoreService:", error);
            throw new StoreServiceError('An unexpected error occurred while creating the store', 'INTERNAL_ERROR');
        }
    }
}
module.exports = { createStoreService, StoreServiceError };