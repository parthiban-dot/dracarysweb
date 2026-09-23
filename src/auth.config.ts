import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const FOUNDER_EMAIL = "vinayagamparthiban07@gmail.com";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) return null;
          if (user.email && user.email.toLowerCase() !== FOUNDER_EMAIL.toLowerCase() && user.status !== "APPROVED") {
            return null; // Deny credentials login if not approved
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Founder is always allowed
      if (user.email.toLowerCase() === FOUNDER_EMAIL.toLowerCase()) {
        return true;
      }

      // Check if user exists in database
      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      // If user exists, verify they are APPROVED
      if (existingUser) {
        if (existingUser.status !== "APPROVED") {
          return false; // Blocks login if PENDING or REJECTED
        }
        return true;
      }

      // New users attempting OAuth: allowed so they can reach /onboarding via /join
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as any;
      }
      if (token.status && session.user) {
        session.user.status = token.status as any;
      }
      if (token.onboarded !== undefined && session.user) {
        session.user.onboarded = token.onboarded as boolean;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role || "MEMBER";
        token.status = (user as any).status || "PENDING";
        token.onboarded = (user as any).onboarded ?? false;
      }
      if (trigger === "update" && session?.onboarded !== undefined) {
        token.onboarded = session.onboarded;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
