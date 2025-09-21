'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';

export async function registerUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    return user;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && (error.meta?.target as string[]).includes('email')) {
        throw new Error('This email is already taken');
      }
    }
    const message = error instanceof Error ? error.message : 'Registration error';
    throw new Error(message);
  }
}
