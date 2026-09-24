import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET,
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
    async signIn({ user }) {
      if (user.email === "vinayagamparthiban07@gmail.com") {
        try {
          await prisma.user.update({
            where: { email: user.email },
            data: { role: "SUPER_ADMIN", status: "APPROVED" }
          });
        } catch (e) {
          console.error("Failed to force promote admin", e);
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id
        const dbUser = user as any; 
        
        if (session.user.email === "vinayagamparthiban07@gmail.com") {
           session.user.role = "SUPER_ADMIN";
           session.user.status = "APPROVED";
        } else {
           session.user.role = dbUser.role || "MEMBER"
           session.user.status = dbUser.status || "PENDING"
        }
        
        session.user.onboarded = dbUser.onboarded || false
      }
      return session
    }
  }
})