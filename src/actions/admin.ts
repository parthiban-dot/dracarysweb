"use server";

import { auth } from "@/auth";
import { PrismaClient, UserStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateUserApproval(userId: string, status: UserStatus) {
  const session = await auth();
  
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status }
  });

  revalidatePath("/dashboard/admin/users");
}

export async function promoteToAdmin(userId: string) {
  const session = await auth();
  
  if (session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" }
  });

  revalidatePath("/dashboard/admin/users");
}