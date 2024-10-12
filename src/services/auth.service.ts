import passport from 'passport';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<User | null> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (e) {
    console.error('auth.service 에러', e);
    return null;
  }
}

async function loginUser(
  email: string,
  password: string
): Promise<string | null> {
  let token: string | null = null;
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: User, info: { message: string }) => {
      if (err || !user) {
        throw new Error(info ? info.message : 'Login failed');
      }

      token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string
      );
    }
  );

  return token;
}

export default { registerUser, loginUser };
