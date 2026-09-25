"use server";
import { sendEmail } from "@/lib/email";
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
  
  const app = await prisma.joinApplication.update({
    where: { id },
    data: { status }
  });

  // If newly accepted, send welcome email
  if (status === "ACCEPTED" && app.email) {
    const loginUrl = (process.env.AUTH_URL || "https://dracarysweb.vercel.app") + "/login";
    
    await sendEmail({
      to: app.email,
      subject: "Welcome to DRACARYS - Application Accepted",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #0d1117; color: #e6edf3; padding: 24px; border-radius: 8px;">
        <h2 style="color: #3b82f6; margin-top: 0;">Congratulations, ${app.name}!</h2>
        <p style="font-size: 16px;">Your application to join the DRACARYS engineering team has been <strong>ACCEPTED</strong>.</p>
        <p style="font-size: 16px; margin-top: 16px;">You now have full access to our internal systems. To complete your onboarding and set up your member profile, please log in to the Member Portal using the Google account associated with this email (${app.email}).</p>
        
        <div style="margin-top: 32px; text-align: center;">
          <a href="${loginUrl}" style="background-color: #3b82f6; color: #ffffff; padding: 14px 28px; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">
            Access Member Portal
          </a>
        </div>
        <p style="font-size: 12px; color: #8b949e; margin-top: 32px; text-align: center;">
          Welcome to the team.<br>BUILD. COMPETE. LEARN. SHIP.
        </p>
      </div>
      `
    });
  }

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