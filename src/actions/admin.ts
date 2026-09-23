"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Security Helper
async function verifyAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    throw new Error("Insufficient permissions");
  }
  return session.user;
}

// Audit Logger Helper
async function logAudit(userId: string, action: string, resource: string, details?: string) {
  try {
    await db.auditLog.create({
      data: { userId, action, resource, details }
    });
  } catch (error) {
    console.error("Audit log failed", error);
  }
}

// --- MEMBERS ---

export async function deleteMember(userId: string) {
  try {
    const admin = await verifyAdmin();
    await db.user.delete({ where: { id: userId } });
    await logAudit(admin.id, "DELETE", "USER", `Deleted user ID: ${userId}`);
    revalidatePath("/admin/members");
    return { success: "Member deleted successfully." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to execute action." };
  }
}

export async function updateMemberRole(userId: string, newRole: "MEMBER" | "PROJECT_LEAD" | "ADMIN") {
  try {
    const admin = await verifyAdmin();
    if (admin.role !== "SUPER_ADMIN") throw new Error("Only SUPER_ADMIN can change roles.");
    
    await db.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
    await logAudit(admin.id, "UPDATE_ROLE", "USER", `Updated user ${userId} to ${newRole}`);
    revalidatePath("/admin/members");
    return { success: "Role updated." };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed." };
  }
}

export async function toggleMemberApproval(userId: string, isApproved: boolean) {
  try {
    const admin = await verifyAdmin();
    await db.memberProfile.update({
      where: { userId },
      data: { isApproved, approvalToken: null }
    });
    await logAudit(admin.id, isApproved ? "APPROVE_MEMBER" : "REVOKE_MEMBER", "USER", `User ID: ${userId}`);
    revalidatePath("/admin/members");
    revalidatePath("/team");
    return { success: `Member ${isApproved ? 'approved' : 'approval revoked'}.` };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed." };
  }
}

// --- PROJECTS ---

export async function deleteProject(projectId: string) {
  try {
    const admin = await verifyAdmin();
    await db.project.delete({ where: { id: projectId } });
    await logAudit(admin.id, "DELETE", "PROJECT", `Deleted project ID: ${projectId}`);
    revalidatePath("/admin/projects");
    return { success: "Project deleted." };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed." };
  }
}

// --- ANNOUNCEMENTS ---

export async function toggleAnnouncementPublish(id: string, isPublished: boolean) {
  try {
    const admin = await verifyAdmin();
    await db.announcement.update({
      where: { id },
      data: { isPublished }
    });
    await logAudit(admin.id, isPublished ? "PUBLISH" : "UNPUBLISH", "ANNOUNCEMENT", `Announcement ID: ${id}`);
    revalidatePath("/admin/announcements");
    return { success: `Announcement ${isPublished ? 'published' : 'unpublished'}.` };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed." };
  }
}

// --- ENQUIRIES ---

export async function updateEnquiryStatus(id: string, status: string) {
  try {
    const admin = await verifyAdmin();
    await db.contactSubmission.update({
      where: { id },
      data: { status }
    });
    await logAudit(admin.id, "UPDATE_STATUS", "ENQUIRY", `Enquiry ID: ${id} to ${status}`);
    revalidatePath("/admin/enquiries");
    return { success: "Status updated." };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "Failed." };
  }
}
