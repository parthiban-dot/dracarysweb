"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/lib/validations/profile";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function updateProfile(values: z.infer<typeof ProfileSchema>) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields provided" };
  }

  const { name, bio, githubUrl, linkedinUrl, skills, year } = validatedFields.data;

  // Process skills into array
  const skillsArray = skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  try {
    // 1. Update basic user info (only name allowed here)
    await db.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    // 2. Upsert member profile
    await db.memberProfile.upsert({
      where: { userId: session.user.id },
      update: {
        bio: bio || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        skills: skillsArray,
        year: year || null,
      },
      create: {
        userId: session.user.id,
        bio: bio || null,
        githubUrl: githubUrl || null,
        linkedinUrl: linkedinUrl || null,
        skills: skillsArray,
        year: year || null,
      },
    });

    revalidatePath("/dashboard/profile");
    return { success: "Profile updated successfully!" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Database error. Check connection." };
  }
}
