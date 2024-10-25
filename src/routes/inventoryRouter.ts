import { Router } from 'express';

import inventoryController from '../controllers/inventory.controller';
const inventoryRouter = Router();

// 전체 재고 조회
inventoryRouter.get('/', inventoryController.getAllInventory);

// 특정 재고 조회
inventoryRouter.get('/:id', inventoryController.getInventoryById);

// 재고 추가
inventoryRouter.post('/create', inventoryController.createInventory);

// 재고 수정
inventoryRouter.put('/:id', inventoryController.updateInventory);

// 재고 삭제
inventoryRouter.delete('/:id', inventoryController.deleteInventory);

// 유통기한이 임박한 재고 조회
inventoryRouter.get('/expiring-soon', inventoryController.getExpiringSoon);

// 재고 부족 조회
inventoryRouter.get('/out-of-stock', inventoryController.getOutOfStock);

export default inventoryRouter;
