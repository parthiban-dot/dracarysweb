"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/shared/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { founderProfile } from "@/lib/demo-data";
import { LiquidGlass } from "@/components/shared/liquid-glass";

export default function FounderPage() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent overflow-hidden selection:bg-primary/30">
      
      {/* HERO SECTION THEME FOR FOUNDER */}
      <Section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden z-10 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
            
            {/* Minimal Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent border border-primary/30 flex items-center justify-center relative mb-8 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <span className="text-5xl md:text-6xl font-extrabold text-white/50 tracking-tighter">{founderProfile.name.charAt(0)}</span>
              <div className="absolute -bottom-2 right-4 bg-background border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-primary flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ONLINE
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold heading-dragon mb-4 tracking-tight text-white drop-shadow-lg">
              {founderProfile.name}
            </h1>
            <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold tracking-widest uppercase mb-8">
              {founderProfile.tag} • {founderProfile.role}
            </p>
            
            <div className="flex gap-6 justify-center items-center">
              <Link href={founderProfile.socials.github} target="_blank" className="text-white/60 hover:text-white transition-colors flex items-center text-sm font-medium">
                <GithubIcon className="w-5 h-5 mr-2" /> GitHub
              </Link>
              <Link href={founderProfile.socials.linkedin} target="_blank" className="text-white/60 hover:text-white transition-colors flex items-center text-sm font-medium">
                <LinkedinIcon className="w-5 h-5 mr-2" /> LinkedIn
              </Link>
              <Link href="https://www.instagram.com/its_.prince._here?stkn=MXBld3RqdGVjZ3pnMw==" target="_blank" className="text-white/60 hover:text-white transition-colors flex items-center text-sm font-medium">
                <InstagramIcon className="w-5 h-5 mr-2" /> Instagram
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Main Content Container */}
      <Container className="relative z-10 max-w-4xl mx-auto pt-16 pb-24 px-6 md:px-8">
        <div className="space-y-16">
          
          {/* The Origin */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">The Origin</h2>
            <LiquidGlass className="p-8 border-white/5">
              <div className="text-white/80 leading-loose space-y-4 text-lg">
                <p>
                  DRACARYS started with a simple idea — learning by building.
                </p>
                <p>
                  Instead of stopping at college projects, we wanted to create a space where students could work together, build real products, participate in hackathons, and turn ideas into something useful.
                </p>
                <p>
                  A year ago, I was looking for opportunities. Today, I’m finally in a position to create opportunities for others.
                </p>
              </div>
            </LiquidGlass>
          </motion.section>

          {/* The Vision */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">The Vision</h2>
            <LiquidGlass className="p-8 border-white/5">
              <p className="text-white/80 leading-loose text-lg font-medium italic">
                "{founderProfile.vision}"
              </p>
            </LiquidGlass>
          </motion.section>

          {/* How We Work */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">How We Work</h2>
            <p className="text-white/80 leading-loose mb-6 text-lg">
              We learn together, build together, and grow through real projects.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl text-lg">
                <span className="text-primary font-bold">01.</span> Build with purpose
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl text-lg">
                <span className="text-primary font-bold">02.</span> Learn from each other
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl text-lg">
                <span className="text-primary font-bold">03.</span> Take ownership
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl text-lg">
                <span className="text-primary font-bold">04.</span> Ship real products
              </li>
            </ul>
          </motion.section>

          {/* What We Build */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">What We Build</h2>
            <div className="grid md:grid-cols-3 gap-6">
              
              <LiquidGlass className="p-6 border-white/5 group hover:border-primary/30 transition-all">
                <h3 className="text-lg font-bold text-white mb-2 transition-colors">Industrial Workshop Platform</h3>
                <p className="text-xs text-primary/80 tracking-wide font-mono uppercase">Full-Stack • AI Chatbot</p>
              </LiquidGlass>

              <LiquidGlass className="p-6 border-white/5 group hover:border-primary/30 transition-all">
                <h3 className="text-lg font-bold text-white mb-2 transition-colors">AI Jewellery Design Platform</h3>
                <p className="text-xs text-primary/80 tracking-wide font-mono uppercase">Computer Vision • AI • Full-Stack</p>
              </LiquidGlass>

              <LiquidGlass className="p-6 border-white/5 group hover:border-primary/30 transition-all">
                <h3 className="text-lg font-bold text-white mb-2 transition-colors">DRACARYS Website</h3>
                <p className="text-xs text-primary/80 tracking-wide font-mono uppercase">Next.js • TypeScript • Vercel</p>
              </LiquidGlass>

            </div>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-12 text-center">
             <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
               <Link href="/projects">Explore DRACARYS</Link>
             </Button>
          </motion.div>
          
        </div>
      </Container>
    </main>
  );
}