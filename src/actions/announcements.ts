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

export async function createAnnouncement(data: {
  title: string;
  content: string;
  priority: string;
  isPublished: boolean;
}) {
  const session = await requireAdmin();
  
  await prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content,
      priority: data.priority,
      isPublished: data.isPublished,
      authorId: session.user.id!
    }
  });

  revalidatePath("/dashboard/admin/announcements");
  revalidatePath("/dashboard");
}

export async function toggleAnnouncementPublish(id: string, isPublished: boolean) {
  await requireAdmin();
  
  await prisma.announcement.update({
    where: { id },
    data: { isPublished }
  });

  revalidatePath("/dashboard/admin/announcements");
  revalidatePath("/dashboard");
}

export async function deleteAnnouncement(id: string) {
  await requireAdmin();
  
  await prisma.announcement.delete({
    where: { id }
  });

  revalidatePath("/dashboard/admin/announcements");
  revalidatePath("/dashboard");
}