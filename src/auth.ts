import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  events: {
    async createUser({ user }) {
      if (user.email === "vinayagamparthiban07@gmail.com") {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "SUPER_ADMIN", status: "APPROVED" }
        })
      } else if (user.email) {
        const application = await prisma.joinApplication.findFirst({
          where: { email: user.email, status: "ACCEPTED" }
        });
        if (application) {
          await prisma.user.update({
            where: { id: user.id },
            data: { status: "APPROVED" }
          });
        }
      }
    }
  },
  callbacks: {
    ...authConfig.callbacks,
    async signIn(params) {
      const { user, account, profile } = params;
      
      // Auto-approve admin on sign-in just in case
      if (user.email === "vinayagamparthiban07@gmail.com") {
        try {
          const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
          if (dbUser && dbUser.role !== "SUPER_ADMIN") {
            await prisma.user.update({
              where: { email: user.email },
              data: { role: "SUPER_ADMIN", status: "APPROVED" }
            });
          }
        } catch (e) {
          console.error("Failed to force promote admin", e);
        }
        return true;
      }
      
      // Call the auth.config.ts signIn logic
      if (authConfig.callbacks?.signIn) {
        return authConfig.callbacks.signIn(params);
      }
      return true;
    }
  }
})