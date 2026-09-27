"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { HackathonCard } from "@/components/features/hackathon-card";
import { PrismaClient } from "@prisma/client";
import { HackathonsClient } from "./hackathons-client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function HackathonsPage() {
  const dbHackathons = await prisma.hackathon.findMany({
    orderBy: { year: "desc" },
    include: { teamMembers: { include: { user: true } } }
  });

  const hackathons = JSON.parse(JSON.stringify(dbHackathons));

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5">
        <Container>
          <SectionHeader 
            title="Hackathon Archive"
            description="A record of our competitive builds and rapid prototyping."
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <HackathonsClient initialHackathons={hackathons} />
        </Container>
      </Section>
    </>
  );
}