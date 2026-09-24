import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "MEMBER" | "PROJECT_LEAD" | "ADMIN" | "SUPER_ADMIN"
      status: "PENDING" | "APPROVED" | "REJECTED"
      onboarded: boolean
    } & DefaultSession["user"]
  }
}