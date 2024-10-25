import { Router } from 'express';

import inventoryController from '../controllers/inventory.controller';
import passport from 'passport';
const inventoryRouter = Router();

// 전체 재고 조회
inventoryRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  inventoryController.getAllInventory
);

// 특정 재고 조회
inventoryRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  inventoryController.getInventoryById
);

// 재고 추가
inventoryRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  inventoryController.createInventory
);

// 재고 수정
inventoryRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  inventoryController.updateInventory
);

// 재고 삭제
inventoryRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  inventoryController.deleteInventory
);

// 유통기한이 임박한 재고 조회
inventoryRouter.get(
  '/expiring-soon',
  passport.authenticate('jwt', { session: false }),
  inventoryController.getExpiringSoon
);

// 재고 부족 조회
inventoryRouter.get(
  '/out-of-stock',
  passport.authenticate('jwt', { session: false }),
  inventoryController.getOutOfStock
);

export default inventoryRouter;
