"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function updateUserApproval(userId: string, status: "APPROVED" | "REJECTED" | "PENDING") {
  await requireAdmin();
  await prisma.user.update({
    where: { id: userId },
    data: { status }
  });
  revalidatePath("/dashboard/admin/users");
}

export async function promoteToAdmin(userId: string) {
  await requireAdmin();
  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN", status: "APPROVED" }
  });
  revalidatePath("/dashboard/admin/users");
}

export async function updateJoinApplicationStatus(id: string, status: string) {
  await requireAdmin();
  await prisma.joinApplication.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/dashboard/admin/applications");
}

export async function updateProjectInquiryStatus(id: string, status: string, adminNotes?: string) {
  await requireAdmin();
  const data: any = { status };
  if (adminNotes !== undefined) data.adminNotes = adminNotes;
  
  await prisma.projectInquiry.update({
    where: { id },
    data
  });
  revalidatePath("/dashboard/admin/inquiries");
}