import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";

const FOUNDER_EMAIL = "vinayagamparthiban07@gmail.com";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to /login for user friendly messages
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
    async createUser({ user }) {
      if (user.email && user.email.toLowerCase() === FOUNDER_EMAIL.toLowerCase()) {
        await db.user.update({
          where: { id: user.id },
          data: { role: "SUPER_ADMIN", status: "APPROVED", onboarded: true },
        });
      }
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
