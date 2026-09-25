"use client";

import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { founderProfile } from "@/lib/demo-data";

export default function FounderPage() {
  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden selection:bg-primary/30">
      
      {/* Main Content Container - Max width 750px approx for readability */}
      <Container className="relative z-10 max-w-3xl mx-auto pt-32 pb-24 px-6 md:px-8">
        
        {/* Founder Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-white/10 pb-12 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          {/* Minimal Avatar */}
          <div className="w-28 h-28 shrink-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent border border-primary/30 flex items-center justify-center relative">
            <span className="text-4xl font-extrabold text-white/50 tracking-tighter">{founderProfile.name.charAt(0)}</span>
            <div className="absolute -bottom-2 right-4 bg-background border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ONLINE
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{founderProfile.name}</h1>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              {founderProfile.tag} â€¢ {founderProfile.role}
            </p>
            
            <div className="flex gap-6 justify-center md:justify-start">
              <Link href={founderProfile.socials.github} target="_blank" className="text-white/60 hover:text-white transition-colors flex items-center text-sm font-medium">
                <GithubIcon className="w-4 h-4 mr-2" /> GitHub
              </Link>
              <Link href={founderProfile.socials.linkedin} target="_blank" className="text-white/60 hover:text-white transition-colors flex items-center text-sm font-medium">
                <LinkedinIcon className="w-4 h-4 mr-2" /> LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Text Sections */}
        <div className="space-y-16">
          
          {/* The Origin */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-white mb-4">The Origin</h2>
            <div className="text-white/80 leading-loose space-y-4">
              <p>
                DRACARYS started with a simple idea â€” learning by building.
              </p>
              <p>
                Instead of stopping at college projects, we wanted to create a space where students could work together, build real products, participate in hackathons, and turn ideas into something useful.
              </p>
              <p>
                A year ago, I was looking for opportunities. Today, Iâ€™m finally in a position to create opportunities for others.
              </p>
            </div>
          </motion.section>

          {/* The Vision */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-white mb-4">The Vision</h2>
            <p className="text-white/80 leading-loose">
              To bridge the gap between academic theory and production-grade engineering by building a collective that treats every project like a real-world startup.
            </p>
          </motion.section>

          {/* How We Work */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-white mb-4">How We Work</h2>
            <p className="text-white/80 leading-loose mb-6">
              We learn together, build together, and grow through real projects.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg">
                <span className="text-primary font-bold">01.</span> Build with purpose
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg">
                <span className="text-primary font-bold">02.</span> Learn from each other
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg">
                <span className="text-primary font-bold">03.</span> Take ownership
              </li>
              <li className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg">
                <span className="text-primary font-bold">04.</span> Ship real products
              </li>
            </ul>
          </motion.section>

          {/* What We Build */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">What We Build</h2>
            <div className="space-y-6">
              
              <div className="group cursor-default">
                <h3 className="text-lg font-medium text-white mb-1 transition-colors">Industrial Workshop Platform</h3>
                <p className="text-sm text-white/50 tracking-wide font-mono">Full-Stack <span className="mx-2">Â·</span> AI Chatbot</p>
              </div>

              <div className="group cursor-default">
                <h3 className="text-lg font-medium text-white mb-1 transition-colors">AI Jewellery Design Platform</h3>
                <p className="text-sm text-white/50 tracking-wide font-mono">Computer Vision <span className="mx-2">Â·</span> AI <span className="mx-2">Â·</span> Full-Stack</p>
              </div>

              <div className="group cursor-default">
                <h3 className="text-lg font-medium text-white mb-1 transition-colors">DRACARYS Website</h3>
                <p className="text-sm text-white/50 tracking-wide font-mono">Next.js <span className="mx-2">Â·</span> TypeScript <span className="mx-2">Â·</span> Vercel</p>
              </div>

            </div>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-12 text-center md:text-left">
             <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
               <Link href="/projects">Explore DRACARYS</Link>
             </Button>
          </motion.div>
          
        </div>
      </Container>
    </div>
  );
}