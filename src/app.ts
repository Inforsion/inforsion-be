import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import indexRouter from './routes/indexRouter';
import userRouter from './routes/authRouter';
import storeRouter from './routes/storeRouter';
import productRouter from './routes/productRouter';
import errorHandler from './middlewares/errorMiddleware';
import setupPassport from './config/passport';
import corsOption from './config/cors.config';

dotenv.config();

// App
const app: Express = express();
app.set('PORT', process.env.EXPRESS_PORT || 8080);

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
app.use('/product', productRouter);

// Error Handle Middleware
app.use(errorHandler as express.ErrorRequestHandler);

export default app;
