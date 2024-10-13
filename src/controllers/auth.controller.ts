import userService from '../services/auth.service';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      res.status(400).json({
        message: '요청 형식이 잘못되었습니다.',
      });
    }
    const userId = await userService.registerUser(username, email, password);
    if (userId) {
      res.status(201).json({ message: '회원가입 성공' });
    } else {
      res.status(400).json({
        message: '회원가입 실패',
      });
    }
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: info ? info.message : '로그인 실패',
        });
      }

      try {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET as string
        );

        return res.status(200).json({
          message: '로그인 성공!',
          accessToken: accessToken,
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

export { register, login };
