import prisma from './prisma'

export const isFirstLogin = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
  })
  return !profile?.username
}
