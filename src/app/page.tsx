"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, MapPin, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";

// Data
import { siteStats, demoProjects, demoHackathons, coreTechnologies } from "@/lib/demo-data";

// Cards
import { ProjectCard } from "@/components/features/project-card";
import { HackathonCard } from "@/components/features/hackathon-card";

// New components
import { TerminalAnimation } from "@/components/features/terminal-animation";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DRACARYS",
    "url": "https://dracarysweb.vercel.app",
    "logo": "https://dracarysweb.vercel.app/logo.png",
    "description": "DRACARYS is a student-led engineering team building real-world software, experimenting with AI and competing in hackathons."
  };

  const workflowSteps = [
    { num: "01", title: "FIND", desc: "Identify a real problem." },
    { num: "02", title: "THINK", desc: "Research and design the solution." },
    { num: "03", title: "BUILD", desc: "Prototype and develop." },
    { num: "04", title: "BREAK", desc: "Test, fail, fix and repeat." },
    { num: "05", title: "SHIP", desc: "Deploy and share it with the world." },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 1. HERO SECTION */}
      <Section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden z-10">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs font-semibold tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10"><MapPin className="w-3.5 h-3.5 text-primary" /> Coimbatore, India</span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10"><GraduationCap className="w-3.5 h-3.5 text-secondary" /> Student-led</span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10"><Zap className="w-3.5 h-3.5 text-amber-500" /> Hackathon-driven</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold heading-dragon mb-6 tracking-tight text-white drop-shadow-lg">
              FORGE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FUTURE.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              A student engineering team building, competing and learning together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Link href="/projects">
                  EXPLORE PROJECTS
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 text-white">
                <Link href="/team">MEET THE TEAM</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* 2. STATS */}
      <div className="border-y border-white/5 bg-background/50 backdrop-blur-md relative z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {[
              { label: "Projects", value: `${siteStats.projectsDelivered}+` },
              { label: "Hackathons", value: `${siteStats.hackathonsWon}+` },
              { label: "Members", value: `${siteStats.teamMembers}+` },
              { label: "Technologies", value: `${siteStats.technologiesUsed}+` },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* 3. WHAT WE DO */}
      <Section className="relative z-10 py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <TerminalAnimation />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-12">
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
                  <span className="text-primary font-mono text-sm bg-primary/10 px-2 py-1 rounded">01</span> BUILD
                </h3>
                <p className="text-muted-foreground text-lg">We turn ideas and real-world problems into working products.</p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
                  <span className="text-secondary font-mono text-sm bg-secondary/10 px-2 py-1 rounded">02</span> COMPETE
                </h3>
                <p className="text-muted-foreground text-lg">We take our ideas into hackathons and technical competitions.</p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3">
                  <span className="text-amber-500 font-mono text-sm bg-amber-500/10 px-2 py-1 rounded">03</span> LEARN
                </h3>
                <p className="text-muted-foreground text-lg">Every project, failure, and experiment becomes part of our engineering journey.</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 4. HOW WE BUILD (WORKFLOW) */}
      <Section className="bg-background/40 border-y border-white/5 relative z-10 py-24 overflow-hidden">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">How We Build</h2>
            <p className="text-white/60 max-w-2xl">
              We build things, break things, learn from them, and build again.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />
            
            {workflowSteps.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center p-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#05050a] border border-white/20 flex items-center justify-center font-mono font-bold text-primary mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  {step.num}
                </div>
                <h4 className="text-lg font-extrabold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. FEATURED PROJECTS */}
      <Section className="relative z-10 py-24">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">Case Studies</h2>
            <p className="text-white/60 max-w-2xl">
              Actual software built and deployed by our team.
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

      {/* 6. TECH ARSENAL (Grouped conceptually) */}
      <Section className="bg-background/40 border-y border-white/5 relative z-10 py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white mb-4">Technology Stack</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12">
              We only list technologies we genuinely use and experiment with in production.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-5xl mx-auto">
              <LiquidGlass className="p-6 border-white/5 hover:border-white/10 transition-colors">
                <h4 className="text-primary font-bold mb-4 flex items-center gap-2"><Terminal className="w-4 h-4"/> Frontend</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </LiquidGlass>
              <LiquidGlass className="p-6 border-white/5 hover:border-white/10 transition-colors">
                <h4 className="text-secondary font-bold mb-4 flex items-center gap-2"><Terminal className="w-4 h-4"/> Backend</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Node.js</li>
                  <li>Python & FastAPI</li>
                  <li>PostgreSQL</li>
                  <li>Prisma ORM</li>
                </ul>
              </LiquidGlass>
              <LiquidGlass className="p-6 border-white/5 hover:border-white/10 transition-colors">
                <h4 className="text-amber-500 font-bold mb-4 flex items-center gap-2"><Terminal className="w-4 h-4"/> AI / ML</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>OpenAI & Anthropic</li>
                  <li>LangChain</li>
                  <li>Vector Databases</li>
                  <li>RAG Architectures</li>
                </ul>
              </LiquidGlass>
              <LiquidGlass className="p-6 border-white/5 hover:border-white/10 transition-colors">
                <h4 className="text-emerald-500 font-bold mb-4 flex items-center gap-2"><Terminal className="w-4 h-4"/> Infrastructure</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Vercel</li>
                  <li>Docker</li>
                  <li>GitHub Actions</li>
                  <li>Supabase</li>
                </ul>
              </LiquidGlass>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. JOIN CTA (HUMANIZED) */}
      <Section className="relative z-10 py-24 lg:py-32">
        <Container>
          <div className="p-12 md:p-20 text-center relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold heading-dragon text-white">Think you can build with us?</h2>
              <p className="text-lg text-white/70 font-medium">
                We're not looking for people who know everything. We're looking for people who are willing to learn, build, experiment, and show up.
              </p>
              <p className="text-sm text-muted-foreground pb-4">
                Built by students who would rather prototype an idea than just talk about it.
              </p>
              <div className="flex flex-col justify-center pt-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-12 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Link href="/join">JOIN DRACARYS</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
