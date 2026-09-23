import { db } from "@/lib/db";
import { demoMembers } from "@/lib/demo-data";
import { TeamClient, TeamMemberItem } from "./team-client";

export const revalidate = 60;

export default async function TeamPage() {
  let dbMembers: TeamMemberItem[] = [];

  try {
    const approvedUsers = await db.user.findMany({
      where: {
        OR: [
          { status: "APPROVED" },
          { profile: { isApproved: true } },
        ],
      },
      include: {
        profile: true,
      },
      orderBy: { createdAt: "asc" },
    });

    dbMembers = approvedUsers.map((u) => ({
      id: u.id,
      name: u.name || u.email || "Dragon Member",
      tag: u.profile?.memberTag || "Core Member",
      role: u.role,
      year: u.profile?.year || "Active",
      skills: u.profile?.skills || [],
      bio: u.profile?.bio || "",
      github: u.profile?.githubUrl || undefined,
      linkedin: u.profile?.linkedinUrl || undefined,
    }));
  } catch (error) {
    console.error("Could not fetch team members from DB:", error);
  }

  const combinedMembers: TeamMemberItem[] = dbMembers.length > 0 ? dbMembers : demoMembers;

  return <TeamClient members={combinedMembers} />;
}
