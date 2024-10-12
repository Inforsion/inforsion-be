import express, { Request, Response, NextFunction } from 'express';

const indexRouter = express.Router();

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Hello, Inforsion!' });
  } catch (error) {
    console.error(error);
  }
};

indexRouter.get('/health', healthCheck);

export default indexRouter;
