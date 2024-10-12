import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {
  createStore,
  getStores,
  deleteStore,
  updateStore,
  getStoreDetail,
} from '../controllers/store.controller';

const storeRouter = express.Router();

// POST store/create
storeRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) =>
    createStore(req, res, next)
);

// GET store/list
storeRouter.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) => getStores(req, res, next)
);

// GET store/:id
storeRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) =>
    getStoreDetail(req, res, next)
);

// PUT store/:id
storeRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) =>
    updateStore(req, res, next)
);

// DELETE store/:id
storeRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) =>
    deleteStore(req, res, next)
);

export default storeRouter;
