"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { SectionHeader } from "@/components/shared/section-header";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Terminal } from "lucide-react";
import Link from "next/link";

// Data
import { 
  siteStats, 
  demoProjects, 
  demoHackathons, 
  demoMembers, 
  coreTechnologies 
} from "@/lib/demo-data";

// Cards
import { ProjectCard } from "@/components/features/project-card";
import { HackathonCard } from "@/components/features/hackathon-card";
import { MemberCard } from "@/components/features/member-card";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DRACARYS",
    "url": "https://dracarys.tech",
    "logo": "https://dracarys.tech/og-image.jpg",
    "description": "DRACARYS is a student-led technology collective building production-grade applications.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. HERO SECTION */}
      <Section className="relative flex items-center min-h-[90vh] overflow-hidden pt-20">
        <Container className="relative z-10 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
              Development Environment (Demo Data)
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold heading-dragon">
              WE BUILD BEYOND <br /> THE EXPECTED.
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
              DRACARYS is a student-led technology team building real products, solving real problems, and competing on real-world stages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild size="lg" className="dragon-glow h-12 px-8 text-sm font-semibold">
                <Link href="/projects">Explore Our Work <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-panel text-foreground border-white/10 hover:bg-white/5 h-12 px-8 text-sm">
                <Link href="/team">Meet The Team</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 2. TRUST / STATISTICS */}
      <div className="border-y border-white/5 bg-background/40 backdrop-blur-md">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {[
              { label: "Projects Delivered", value: siteStats.projectsDelivered },
              { label: "Hackathons Participated", value: siteStats.hackathonsWon },
              { label: "Team Members", value: siteStats.teamMembers },
              { label: "Technologies", value: siteStats.technologiesUsed },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-2">
                  {stat.value}+
                </p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. ABOUT DRACARYS */}
      <Section className="relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionHeader 
                title="Forged in Code." 
                description="We are not just a club. We are a collective of developers, designers, and architects who treat every project like a production-grade startup."
                align="left"
                className="mb-6"
              />
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-start"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0 mt-0.5" /> We build real solutions for real clients.</li>
                <li className="flex items-start"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0 mt-0.5" /> We compete in global hackathons.</li>
                <li className="flex items-start"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0 mt-0.5" /> We release open-source tools for the community.</li>
              </ul>
              <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
                <Link href="/about">Read Our Manifesto</Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <LiquidGlass heavy className="aspect-video relative flex items-center justify-center border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <Terminal className="w-16 h-16 text-primary/50" />
              </LiquidGlass>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 4. FEATURED PROJECTS */}
      <Section className="bg-background/40 border-y border-white/5 relative z-10">
        <Container>
          <SectionHeader 
            title="Featured Projects" 
            description="Production-grade applications built and delivered by our team."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProjects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
              <Link href="/projects">View All Projects <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5. HACKATHON HIGHLIGHTS */}
      <Section className="relative z-10">
        <Container>
          <SectionHeader 
            title="Hackathon Glory" 
            description="Where we test our limits against the best."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {demoHackathons.map((hack, i) => (
              <motion.div key={hack.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <HackathonCard {...hack} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. TECHNOLOGY ECOSYSTEM */}
      <Section className="bg-background/40 border-y border-white/5 relative z-10 overflow-hidden">
        <Container className="text-center">
          <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-8">Our Technology Arsenal</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {coreTechnologies.map((tech, i) => (
              <motion.div key={tech} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-foreground/80 hover:bg-white/10 hover:border-primary/50 transition-colors cursor-default">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. TEAM PREVIEW & 8. FOUNDER PREVIEW */}
      <Section className="relative z-10">
        <Container>
          <SectionHeader 
            title="The Dragons" 
            description="Meet the architects, engineers, and designers behind the code."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoMembers.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MemberCard {...member} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>


      {/* 10. FINAL CTA */}
      <Section className="relative z-10 py-24 lg:py-32">
        <Container>
          <LiquidGlass heavy className="p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold heading-dragon">Ready to build something extraordinary?</h2>
              <p className="text-lg text-muted-foreground">
                Whether you want to hire us for a project or join our ranks as a developer, the gates are open.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="dragon-glow h-12 px-8">
                  <Link href="/contact">Collaborate With Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-8">
                  <Link href="/join">Apply to Join</Link>
                </Button>
              </div>
            </div>
          </LiquidGlass>
        </Container>
      </Section>
    </>
  );
}
