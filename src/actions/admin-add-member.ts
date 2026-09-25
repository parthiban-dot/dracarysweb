"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function adminAddMember(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const role = formData.get("role") as any || "MEMBER";
  const memberTag = formData.get("memberTag") as string;
  const skills = (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean);
  const bio = formData.get("bio") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const year = formData.get("year") as string;

  // We create a "dummy" User record so they show up, without an email/Google auth link.
  // They are created as APPROVED so they show up immediately on the team page.
  await prisma.user.create({
    data: {
      name,
      role,
      status: "APPROVED",
      onboarded: true,
      profile: {
        create: {
          memberTag,
          bio,
          skills,
          year,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          instagramUrl: instagramUrl || null,
          isApproved: true,
        }
      }
    }
  });

  revalidatePath("/team");
  revalidatePath("/dashboard/admin/users");
  redirect("/team");
}
