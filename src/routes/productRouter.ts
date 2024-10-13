import express, { RequestHandler } from 'express';
import {
  deleteProductById,
  getAllProductsByStore,
  getProduct,
  postProduct,
  putProduct,
} from '../controllers/product.controller';
import passport from 'passport';

const productRouter = express.Router();

// 상품 관련된 라우터

// POST /product/create
// 상품을 생성하는 라우터
productRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  postProduct as RequestHandler
);

productRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  putProduct as RequestHandler
);

productRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteProductById as RequestHandler
);

productRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  getProduct as RequestHandler
);

productRouter.get(
  '/store/:storeId',
  passport.authenticate('jwt', { session: false }),
  getAllProductsByStore as RequestHandler
);

export default productRouter;
