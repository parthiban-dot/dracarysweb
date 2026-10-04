"use server";
import { db as prisma } from "@/lib/db";

import { auth } from "@/auth";
import { PrismaClient, ProjectStatus, Visibility } from "@prisma/client";
import { revalidatePath } from "next/cache";



async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createProject(data: {
  title: string;
  slug: string;
  summary: string;
  type: string;
  year: string;
  problem: string;
  solution: string;
  architecture?: string;
  features: string[];
  technologyStack: string[];
  manualMembers: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  memberIds?: string[];
}) {
  await requireAdmin();
  
  await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        type: data.type,
        year: data.year,
        problem: data.problem,
        solution: data.solution,
        features: data.features,
        technologyStack: data.technologyStack,
        manualMembers: data.manualMembers,
        repositoryUrl: data.repositoryUrl || null,
        demoUrl: data.demoUrl || null,
        status: "IN_PROGRESS",
        clientVisibility: "PUBLIC",
      }
    });

    if (data.memberIds && data.memberIds.length > 0) {
      await tx.projectMember.createMany({
        data: data.memberIds.map(userId => ({
          projectId: project.id,
          userId,
          role: "Developer",
        }))
      });
    }
  });

  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProject(id: string, data: {
  title: string;
  slug: string;
  summary: string;
  type: string;
  status: ProjectStatus;
  year: string;
  problem: string;
  solution: string;
  features: string[];
  technologyStack: string[];
  manualMembers: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  memberIds?: string[];
}) {
  await requireAdmin();
  
  await prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        type: data.type,
        status: data.status,
        year: data.year,
        problem: data.problem,
        solution: data.solution,
        features: data.features,
        technologyStack: data.technologyStack,
        manualMembers: data.manualMembers,
        repositoryUrl: data.repositoryUrl || null,
        demoUrl: data.demoUrl || null,
      }
    });

    if (data.memberIds !== undefined) {
      await tx.projectMember.deleteMany({
        where: { projectId: id }
      });

      if (data.memberIds.length > 0) {
        await tx.projectMember.createMany({
          data: data.memberIds.map(userId => ({
            projectId: id,
            userId,
            role: "Developer",
          }))
        });
      }
    }
  });

  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}