import { db as prisma } from "@/lib/db";
import { HomeClient } from "./home-client";
import { coreTechnologies } from "@/lib/demo-data";



export const revalidate = 30;

export default async function HomePage() {
  const [
    projectsCount,
    hackathonsCount,
    membersCount,
    projects,
    hackathons,
    users
  ] = await Promise.all([
    prisma.project.count(),
    prisma.hackathon.count(),
    prisma.user.count({ where: { status: "APPROVED" } }),
    prisma.project.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.hackathon.findMany({
      take: 3,
      orderBy: { year: "desc" },
    }),
    prisma.user.findMany({
      where: { status: "APPROVED" },
      take: 3,
      include: {
        profile: true
      }
    })
  ]);

  // Format members for MemberCard
  const formattedMembers = users.map(u => ({
    id: u.id,
    name: u.name,
    tag: u.profile?.memberTag || "Member",
    role: u.role === "SUPER_ADMIN" || u.role === "ADMIN" ? "Lead" : "Developer",
    skills: u.profile?.skills || [],
    year: u.profile?.year || undefined,
    github: u.profile?.githubUrl || undefined,
    linkedin: u.profile?.linkedinUrl || undefined,
    instagram: u.profile?.instagramUrl || undefined,
  }));

  // Unique technologies count from real projects (fallback to demo length if empty)
  let techCount = coreTechnologies.length;
  try {
    const allProjects = await prisma.project.findMany({ select: { technologyStack: true } });
    const allTechs = new Set<string>();
    allProjects.forEach(p => p.technologyStack.forEach(t => allTechs.add(t)));
    if (allTechs.size > 0) {
      techCount = allTechs.size;
    }
  } catch(e) {}

  const stats = {
    projects: projectsCount || 5, // fallback if DB empty
    hackathons: hackathonsCount || 4,
    members: membersCount || 16,
    technologies: techCount || 35
  };

  return (
    <HomeClient 
      stats={stats} 
      featuredProjects={JSON.parse(JSON.stringify(projects))} 
      featuredHackathons={JSON.parse(JSON.stringify(hackathons))} 
      featuredMembers={JSON.parse(JSON.stringify(formattedMembers))} 
    />
  );
}