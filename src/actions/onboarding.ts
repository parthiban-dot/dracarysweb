"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import crypto from "crypto";

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
  const approvalToken = isFounder ? null : crypto.randomUUID();
  const isApproved = isFounder; // Founder is automatically approved

  await db.user.update({
    where: { id: session.user.id },
    data: {
      onboarded: true,
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

  // If not founder, send approval email to founder
  if (!isFounder && approvalToken) {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "https://dracarysweb.vercel.app";
    const approveUrl = `${baseUrl}/api/admin/approve-member?token=${approvalToken}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #e6edf3; padding: 24px; border-radius: 8px;">
        <h2 style="color: #3b82f6; margin-top: 0;">🔥 DRACARYS — New Member Initialization Request</h2>
        <p style="font-size: 16px;">A new member has completed Google Authentication & Profile Setup:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 24px; color: #e6edf3;">
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold; width: 140px;">Full Name:</td>
            <td style="padding: 8px;">${session.user.name || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${session.user.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">Member Tag:</td>
            <td style="padding: 8px;">${validated.memberTag}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">Year of Study:</td>
            <td style="padding: 8px;">${validated.year}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">Tech Stack:</td>
            <td style="padding: 8px;">${skillsArray.join(", ")}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">Bio:</td>
            <td style="padding: 8px;">${validated.bio}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">GitHub:</td>
            <td style="padding: 8px;">${validated.githubUrl ? `<a href="${validated.githubUrl}" style="color: #60a5fa;">${validated.githubUrl}</a>` : "None"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #30363d;">
            <td style="padding: 8px; font-weight: bold;">LinkedIn:</td>
            <td style="padding: 8px;">${validated.linkedinUrl ? `<a href="${validated.linkedinUrl}" style="color: #60a5fa;">${validated.linkedinUrl}</a>` : "None"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="${approveUrl}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">
            Approve Member (Yes)
          </a>
        </div>
      </div>
    `;

    await sendEmail({
      to: FOUNDER_EMAIL,
      subject: `[DRACARYS] New Member Request: ${session.user.name || session.user.email}`,
      html: htmlContent,
    });
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
