"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function submitJoinApplication(data: any) {
  try {
    await prisma.joinApplication.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        college: data.college,
        year: data.year,
        skills: data.skills,
        interests: data.interests,
        github: data.github || null,
        linkedin: data.linkedin || null,
        portfolio: data.portfolio || null,
        reason: data.reason,
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Join application error:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}

export async function submitProjectInquiry(data: any) {
  try {
    await prisma.projectInquiry.create({
      data: {
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        projectType: data.projectType,
        description: data.description,
        problem: data.problem,
        features: data.features,
        targetUsers: data.targetUsers,
        timeline: data.timeline,
        budget: data.budget || null,
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Project inquiry error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}