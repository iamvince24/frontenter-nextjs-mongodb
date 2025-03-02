import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '../../../../lib/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) {
        console.error('Account is null')
        return false
      }

      const email = user.email || (user.name ? `${user.name}@${account.provider}.com` : null)

      if (!email) {
        console.error('User email and name are both missing.')
        return false
      }

      const exists = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (account.type === 'oauth' && !exists) {
        const defaultUsername = user.email ? user.email.split('@')[0] : user.name || 'defaultUsername'

        try {
          await prisma.user.create({
            data: {
              username: defaultUsername!,
              email,
              hashedPassword: '', // Set hashedPassword as an empty string
              emailVerified: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          })
        } catch (error) {
          console.error('Error creating new user:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string

        // 從資料庫獲取用戶資訊，包括 username
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub as string,
          },
          select: {
            username: true,
          },
        })

        if (user) {
          session.user.name = user.username
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    // error: "/auth/error", // Error code passed in query string as ?error=
    // // 當需要用戶進行電子郵件驗證時，NextAuth.js 會將用戶重定向到這個路徑，
    // // 以顯示相關的驗證請求。
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // // 當有新用戶進行註冊操作並需要額外資料時，NextAuth.js 會將用戶重定向到這個路徑，
    // // 以收集新用戶的相關資料。
    // newUser: "/auth/new-user",
    // // 當用戶忘記密碼並需要進行密碼重置時，NextAuth.js 會將用戶重定向到這個路徑，
    // // 以執行密碼重置相關的操作。
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
