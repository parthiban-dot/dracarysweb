import { PrismaClient } from "@prisma/client";
import { demoMembers } from "@/lib/demo-data";
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

  // Prevent duplicates if an admin adds someone who is already in the hardcoded demoMembers by name
  const existingNames = new Set(demoMembers.map(m => m.name.toLowerCase()));
  const newCustomMembers = customMembers.filter(m => !existingNames.has(m.name.toLowerCase()));

  // Combine original hardcoded members with new custom members from the database
  const combinedMembers: TeamMemberItem[] = [...demoMembers, ...newCustomMembers];

  return <TeamClient members={combinedMembers} />;
}
