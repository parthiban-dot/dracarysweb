"use server";

import { auth } from "@/auth";
import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createProject(data: {
  title: string;
  summary: string;
  type: string;
  year: string;
  problem: string;
  solution: string;
}) {
  await requireAdmin();
  
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  
  await prisma.project.create({
    data: {
      title: data.title,
      slug,
      summary: data.summary,
      type: data.type,
      year: data.year,
      problem: data.problem,
      solution: data.solution,
      status: "IN_PROGRESS",
      clientVisibility: "PUBLIC"
    }
  });

  revalidatePath("/dashboard/admin/projects");
}

export async function assignProjectMember(projectId: string, userId: string, role: string) {
  await requireAdmin();
  
  await prisma.projectMember.create({
    data: {
      projectId,
      userId,
      role
    }
  });

  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/dashboard");
}

export async function removeProjectMember(assignmentId: string) {
  await requireAdmin();
  
  await prisma.projectMember.delete({
    where: { id: assignmentId }
  });

  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/dashboard");
}

export async function updateProjectStatus(projectId: string, status: ProjectStatus) {
  await requireAdmin();
  
  await prisma.project.update({
    where: { id: projectId },
    data: { status }
  });

  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/dashboard");
}