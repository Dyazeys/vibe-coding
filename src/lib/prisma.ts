import { PrismaClient } from "@prisma/client"

const getPrisma = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient()
  }

  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }

  return globalWithPrisma.prisma
}

const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const instance = getPrisma()
    return (instance as any)[prop]
  },
})

export default prisma
