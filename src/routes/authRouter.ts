// routes/authRouter.js
import express, { Express } from 'express';
const authRouter = express.Router();

// controller
import { register, login } from '../controllers/auth.controller';

// auth/
authRouter.post('/signup', register);
authRouter.post('/login', login);

export default authRouter;
