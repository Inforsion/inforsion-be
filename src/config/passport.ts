import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Application } from 'express';
import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const localVerifyCallback = async (
  username: string,
  password: string,
  done: (error: any, user?: any, options?: any) => void
) => {
  try {
    const user = await prisma.users.findUnique({ where: { email: username } });
    if (!user) {
      return done(null, false, {
        message: '존재하지 않는 사용자입니다. 회원가입을 해주세요.',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: '올바르지 않은 비밀번호입니다. ' });
    }
    return done(null, user);
  } catch (e) {
    console.error(e);
    return done(e);
  }
};

passport.use('local', new LocalStrategy(localOptions, localVerifyCallback));

passport.use(
  new JwtStrategy(
    opts,
    async (
      jwt_payload: { email: string },
      done: (error: any, user?: users | false) => void
    ) => {
      try {
        const user = await prisma.users.findUnique({
          where: { email: jwt_payload.email },
        });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    }
  )
);

// Passport 설정 함수
const setupPassport = (app: Application) => {
  app.use(passport.initialize());
};

export default setupPassport;
