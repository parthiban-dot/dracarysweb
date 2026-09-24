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

// New components
import { TerminalAnimation } from "@/components/features/terminal-animation";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DRACARYS",
    "url": "https://dracarysweb.vercel.app",
    "logo": "https://dracarysweb.vercel.app/logo.png",
    "description": "Student-led technology organization forging academic potential into production-grade engineering excellence."
  };

  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. HERO SECTION */}
      <Section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden z-10">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold heading-dragon mb-6 tracking-tight text-white drop-shadow-lg">
              Forge The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Future.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              We are a collective of developers, designers, and architects. 
              Treating every project like a real-world startup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Link href="/projects">
                  Explore Projects <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 text-white">
                <Link href="/join">Join The Cohort</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 2. STATS */}
      <div className="border-y border-white/5 bg-background/50 backdrop-blur-md relative z-10">
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
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-mono">
                  {stat.value}+
                </div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. ABOUT DRACARYS */}
      <Section className="relative z-10 py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Built Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Classroom.</span>
              </h2>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                We are a student-led technology team building real projects, exploring new ideas, and turning opportunities into things people can actually use.
              </p>
              
              <ul className="space-y-4 mb-10 text-white/80 font-medium">
                <li className="flex items-center"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0" /> Build real-world projects</li>
                <li className="flex items-center"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0" /> Compete, collaborate, and learn</li>
                <li className="flex items-center"><ChevronRight className="w-5 h-5 text-primary mr-2 shrink-0" /> Turn ideas into working products</li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" className="bg-white text-black hover:bg-gray-200 font-bold px-8">
                  <Link href="/projects">Explore Our Work</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 text-white">
                  <Link href="/team">Meet The Team</Link>
                </Button>
              </div>

            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <TerminalAnimation />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 4. TECHNOLOGY ARSENAL */}
      <Section className="relative z-10 py-24 border-t border-white/5 bg-background/20">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-8">Our Technology Arsenal</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {coreTechnologies.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-primary/50 transition-colors cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. FEATURED PROJECTS */}
      <Section className="bg-background/40 border-y border-white/5 relative z-10 py-24">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Featured Projects</h2>
            <p className="text-white/60 max-w-2xl">
              Production-grade applications built and delivered by our team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProjects.slice(0, 3).map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="text-white hover:bg-white/5">
              <Link href="/projects">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. HACKATHONS */}
      <Section className="relative z-10 py-24">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Battle Tested</h2>
            <p className="text-white/60 max-w-2xl">
              We constantly test our skills against global competition in hackathons.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoHackathons.slice(0, 3).map((hackathon, i) => (
              <motion.div key={hackathon.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <HackathonCard {...hackathon} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. THE DRAGONS */}
      <Section className="bg-background/40 border-t border-white/5 relative z-10 py-24">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">The Dragons</h2>
            <p className="text-white/60 max-w-2xl">
              Meet the architects, engineers, and designers behind the code.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoMembers.slice(0, 3).map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <MemberCard {...member} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="text-white hover:bg-white/5">
              <Link href="/team">View Full Team <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 8. FINAL CTA */}
      <Section className="relative z-10 py-24 lg:py-32">
        <Container>
          <div className="p-12 md:p-20 text-center relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold heading-dragon text-white">Ready to build something extraordinary?</h2>
              <p className="text-lg text-white/70">
                Whether you want to hire us for a project or join our ranks as a developer, the gates are open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8">
                  <Link href="/hire">Hire Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 text-white">
                  <Link href="/join">Join Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
