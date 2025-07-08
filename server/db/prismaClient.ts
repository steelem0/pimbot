import { PrismaClient } from '@prisma/client';

let prisma;
if (!globalThis._prisma) {
  globalThis._prisma = new PrismaClient();
}
prisma = globalThis._prisma;

export const usePrisma = () => prisma;