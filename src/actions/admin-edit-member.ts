"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function adminUpdateMember(userId: string, formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const role = formData.get("role") as any;
  const memberTag = formData.get("memberTag") as string;
  const skillsStr = formData.get("skills") as string;
  const skills = skillsStr ? skillsStr.split(",").map(s => s.trim()).filter(Boolean) : [];
  const bio = formData.get("bio") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const year = formData.get("year") as string;

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      role,
      profile: {
        upsert: {
          create: {
            memberTag,
            bio,
            skills,
            year,
            githubUrl: githubUrl || null,
            linkedinUrl: linkedinUrl || null,
            instagramUrl: instagramUrl || null,
            isApproved: true,
          },
          update: {
            memberTag,
            bio,
            skills,
            year,
            githubUrl: githubUrl || null,
            linkedinUrl: linkedinUrl || null,
            instagramUrl: instagramUrl || null,
          }
        }
      }
    }
  });

  revalidatePath("/team");
  revalidatePath("/dashboard/admin/users");
  redirect("/dashboard/admin/users");
}
