import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { db as prisma } from "@/lib/db";
import { ProjectsClient } from "./projects-client";



export const revalidate = 30;

export default async function ProjectsPage() {
  const dbProjects = await prisma.project.findMany({
    where: { 
      clientVisibility: "PUBLIC",
      slug: { notIn: ["siet-bgv"] }
    },
    include: {
      teamMembers: {
        include: { user: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const projects: any[] = JSON.parse(JSON.stringify(dbProjects));

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5">
        <Container>
          <SectionHeader 
            title="Projects Archive"
            description="Explore our repository of built solutions."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <ProjectsClient initialProjects={projects} />
        </Container>
      </Section>
    </>
  );
}