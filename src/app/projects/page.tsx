import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { PrismaClient } from "@prisma/client";
import { ProjectsClient } from "./projects-client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { clientVisibility: "PUBLIC" },
    include: {
      teamMembers: {
        include: { user: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

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