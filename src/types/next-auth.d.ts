import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      onboarded: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    onboarded: boolean;
  }
}
