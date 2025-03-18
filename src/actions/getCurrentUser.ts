import { getServerSession } from 'next-auth'
import prisma from '../lib/prismadb'
import { authOptions } from '@/app/utils/authOptions'

export async function getSession() {
  return await getServerSession(authOptions)
}

export interface CurrentUser {
  id: string
  email: string
  username: string
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
  bio: string | null
  // profileImage: string | null
}

export async function getCurrentUser(refetch: boolean = false): Promise<{
  id: string
  email: string
  username: string
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
  bio: string | null
  // profileImage: string | null
} | null> {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      ...(refetch && {
        select: {
          id: true,
          email: true,
          username: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          bio: true,
          // profileImage: true,
          articles: true,
          collections: true,
        },
      }),
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
      emailVerified: currentUser.emailVerified || null,
    }
  } catch (error) {
    return null
  }
}
