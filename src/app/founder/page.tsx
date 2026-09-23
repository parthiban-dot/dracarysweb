"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { founderProfile } from "@/lib/demo-data";
import { motion } from "framer-motion";
import { Terminal, Users, Quote } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FounderPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative pt-24 overflow-hidden border-b border-white/5 bg-background/20">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border-2 border-primary/50 mx-auto mb-8 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-background/40 backdrop-blur-sm rounded-full" />
              <span className="text-5xl md:text-7xl font-extrabold text-foreground/50 z-10 relative">
                {founderProfile.name.charAt(0)}
              </span>
              <div className="absolute -bottom-4 right-0 bg-background border border-white/10 px-4 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ONLINE
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold heading-dragon mb-2">
              {founderProfile.name}
            </h1>
            <p className="text-2xl font-bold text-primary tracking-widest uppercase mb-4">
              {founderProfile.tag}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {founderProfile.role}
            </p>

            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-muted-foreground">
                <Link href={founderProfile.socials.github} target="_blank"><GithubIcon className="w-4 h-4 mr-2" /> GitHub</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-muted-foreground">
                <Link href={founderProfile.socials.linkedin} target="_blank"><LinkedinIcon className="w-4 h-4 mr-2" /> LinkedIn</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">The Origin</h2>
                </div>
                <LiquidGlass className="p-8 space-y-6">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {founderProfile.story}
                  </p>
                </LiquidGlass>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-secondary" />
                  <h2 className="text-3xl font-bold">Leadership Philosophy</h2>
                </div>
                <LiquidGlass heavy className="p-8 border-secondary/20">
                  <Quote className="w-10 h-10 text-secondary/30 mb-4" />
                  <p className="text-xl italic text-foreground/90 leading-relaxed font-medium">
                    &quot;{founderProfile.philosophy}&quot;
                  </p>
                </LiquidGlass>
              </motion.div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <LiquidGlass className="p-6">
                  <h3 className="text-lg font-bold mb-4 claw-border pl-3">The Vision</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {founderProfile.vision}
                  </p>
                </LiquidGlass>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <LiquidGlass className="p-6">
                  <h3 className="text-lg font-bold mb-4 claw-border pl-3">Arsenal</h3>
                  <div className="flex flex-wrap gap-2">
                    {founderProfile.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </LiquidGlass>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <LiquidGlass className="p-6 dragon-eye">
                  <h3 className="text-lg font-bold mb-4 claw-border pl-3 border-secondary">Selected Work</h3>
                  <ul className="space-y-4">
                    {founderProfile.selectedWork.map((work, i) => (
                      <li key={i} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <p className="font-semibold">{work.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{work.role}</p>
                      </li>
                    ))}
                  </ul>
                </LiquidGlass>
              </motion.div>
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
