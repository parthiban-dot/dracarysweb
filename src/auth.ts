import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "database"
  },
  events: {
    async createUser({ user }) {
      if (user.email === "vinayagamparthiban07@gmail.com") {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "SUPER_ADMIN", status: "APPROVED" }
        })
      }
    }
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        const dbUser = user as any; 
        session.user.role = dbUser.role || "MEMBER"
        session.user.status = dbUser.status || "PENDING"
        session.user.onboarded = dbUser.onboarded || false
      }
      return session
    }
  }
})