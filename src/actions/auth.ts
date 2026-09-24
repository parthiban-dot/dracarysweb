"use server";

import { signIn } from "@/auth";

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}