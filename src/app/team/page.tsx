import { PrismaClient } from "@prisma/client";

import { TeamClient, TeamMemberItem } from "./team-client";

const prisma = new PrismaClient();

export const revalidate = 60;

export default async function TeamPage() {
  
  // Fetch manually added / approved members from the database
  const dbUsers = await prisma.user.findMany({
    where: {
      status: "APPROVED",
      profile: { isNot: null }
    },
    include: {
      profile: true
    }
  });

  const customMembers: TeamMemberItem[] = dbUsers.map(user => ({
    id: user.id,
    name: user.name || "Unknown Member",
    tag: user.profile?.memberTag || "Member",
    role: user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? "Admin" : "Member",
    skills: user.profile?.skills || [],
    year: user.profile?.year || undefined,
    bio: user.profile?.bio || undefined,
    github: user.profile?.githubUrl || undefined,
    linkedin: user.profile?.linkedinUrl || undefined,
    instagram: user.profile?.instagramUrl || undefined,
    image: user.image || undefined,
  }));

  const combinedMembers: TeamMemberItem[] = customMembers;

  return <TeamClient members={combinedMembers} />;
}
