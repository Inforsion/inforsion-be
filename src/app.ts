import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import connectWithRetry from './utils/dbConnection';
import indexRouter from './routes/indexRouter';
import userRouter from './routes/authRouter';
import storeRouter from './routes/storeRouter';
import errorHandler from './middlewares/errorMiddleware';
import setupPassport from './config/passport';
import db from './models/index';
import corsOption from './config/cors.config';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// App
const app: Express = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080);

connectWithRetry()
  .then(() => {
    console.log('Inforsion DB Server가 작동 중입니다...');
  })
  .catch((err: Error) => {
    console.error('예기치 못한 오류 발생:', err);
    process.exit(1);
  });

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));
setupPassport(app);
app.use(cors(corsOption));

// Routes
app.use('/', indexRouter);
app.use('/auth', userRouter);
app.use('/store', storeRouter);

// Error Handle Middleware
app.use(errorHandler);

export default app;
