"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const onboardingSchema = z.object({
  memberTag: z.string().min(2, "Tag must be at least 2 characters").max(50),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(500),
  skills: z.string().min(2, "Please provide some skills"),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  year: z.string().min(1, "Year of study is required"),
});

const FOUNDER_EMAIL = "vinayagamparthiban07@gmail.com";

export async function submitOnboarding(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    memberTag: formData.get("memberTag") as string,
    bio: formData.get("bio") as string,
    skills: formData.get("skills") as string,
    githubUrl: formData.get("githubUrl") as string,
    linkedinUrl: formData.get("linkedinUrl") as string,
    year: formData.get("year") as string,
  };

  const validated = onboardingSchema.parse(rawData);
  const skillsArray = validated.skills.split(",").map(s => s.trim()).filter(Boolean);

  const isFounder = session.user.email.toLowerCase() === FOUNDER_EMAIL.toLowerCase();
  
  // Keep their existing status, or if somehow not set, default to their current session status
  const currentStatus = session.user.status || "PENDING";
  const finalStatus = isFounder ? "APPROVED" : currentStatus;
  const isApproved = finalStatus === "APPROVED";
  const approvalToken = null; // No longer needed since approval happens via JoinApplication

  await db.user.update({
    where: { id: session.user.id },
    data: {
      onboarded: true,
      status: finalStatus as any,
      role: isFounder ? "SUPER_ADMIN" : "MEMBER",
      profile: {
        upsert: {
          create: {
            memberTag: validated.memberTag,
            bio: validated.bio,
            skills: skillsArray,
            githubUrl: validated.githubUrl || null,
            linkedinUrl: validated.linkedinUrl || null,
            year: validated.year,
            isApproved,
            approvalToken,
          },
          update: {
            memberTag: validated.memberTag,
            bio: validated.bio,
            skills: skillsArray,
            githubUrl: validated.githubUrl || null,
            linkedinUrl: validated.linkedinUrl || null,
            year: validated.year,
            isApproved,
            approvalToken,
          }
        }
      }
    },
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
