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
}

export async function createHackathon(data: {
  name: string;
  slug: string;
  organizer: string;
  date: string;
  year: string;
  location: string;
  eventType: string;
  result: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  memberIds?: string[];
}) {
  await requireAdmin();

  await prisma.$transaction(async (tx) => {
    const hackathon = await tx.hackathon.create({
      data: {
        name: data.name,
        slug: data.slug,
        organizer: data.organizer,
        date: data.date,
        year: data.year,
        location: data.location,
        eventType: data.eventType,
        result: data.result,
        problem: data.problem,
        solution: data.solution,
        architecture: data.architecture,
        technologies: data.technologies,
      }
    });

    if (data.memberIds && data.memberIds.length > 0) {
      await tx.hackathonMember.createMany({
        data: data.memberIds.map(userId => ({
          hackathonId: hackathon.id,
          userId,
        }))
      });
    }
  });

  revalidatePath("/dashboard/admin/hackathons");
  revalidatePath("/hackathons");
}

export async function updateHackathon(id: string, data: {
  name: string;
  slug: string;
  organizer: string;
  date: string;
  year: string;
  location: string;
  eventType: string;
  result: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  memberIds?: string[];
}) {
  await requireAdmin();
  
  await prisma.$transaction(async (tx) => {
    await tx.hackathon.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        organizer: data.organizer,
        date: data.date,
        year: data.year,
        location: data.location,
        eventType: data.eventType,
        result: data.result,
        problem: data.problem,
        solution: data.solution,
        architecture: data.architecture,
        technologies: data.technologies,
      }
    });

    if (data.memberIds !== undefined) {
      await tx.hackathonMember.deleteMany({
        where: { hackathonId: id }
      });

      if (data.memberIds.length > 0) {
        await tx.hackathonMember.createMany({
          data: data.memberIds.map(userId => ({
            hackathonId: id,
            userId,
          }))
        });
      }
    }
  });

  revalidatePath("/dashboard/admin/hackathons");
  revalidatePath("/hackathons");
}