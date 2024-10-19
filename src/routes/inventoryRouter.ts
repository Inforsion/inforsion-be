import { Router } from 'express';

const inventoryRouter = Router();

// 전체 재고 조회
inventoryRouter.get('/');

// 특정 재고 조회
inventoryRouter.get('/:id');

// 재고 추가
inventoryRouter.post('/create');

// 재고 수정
inventoryRouter.put('/:id');

// 재고 삭제
inventoryRouter.delete('/:id');

// 유통기한이 임박한 재고 조회
inventoryRouter.get('/expiring-soon');

// 재고 부족 조회
inventoryRouter.get('/out-of-stock');

export default inventoryRouter;
