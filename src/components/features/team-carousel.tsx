"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/shared/icons";
import { TeamMemberItem } from "@/app/team/team-client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface TeamCarouselProps {
  members: TeamMemberItem[];
}

export function TeamCarousel({ members }: TeamCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!members || members.length === 0) return null;

  const nextMember = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const prevMember = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <div className="w-full relative py-12">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Navigation Buttons */}
        <button 
          onClick={prevMember}
          className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-colors hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={nextMember}
          className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-colors hidden md:flex"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Carousel Window */}
        <div className="relative overflow-hidden w-full h-[450px] md:h-[350px] rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute inset-0 p-8 flex flex-col md:flex-row items-center gap-8 overflow-y-auto hide-scrollbar"
            >
              {/* Avatar Side */}
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border-2 border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm rounded-full pointer-events-none" />
                <span className="text-4xl md:text-6xl font-bold text-white/50 relative z-10">
                  {members[activeIndex].name.charAt(0)}
                </span>
                
                {/* Highlight Tag */}
                <div className="absolute -bottom-4 md:bottom-2 md:-right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded shadow-lg z-20 whitespace-nowrap">
                  {members[activeIndex].tag}
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                    {members[activeIndex].name}
                  </h3>
                  <p className="text-primary font-medium tracking-wide">
                    {members[activeIndex].role} {members[activeIndex].year && `Ã¢â‚¬Â¢ ${members[activeIndex].year}`}
                  </p>
                </div>

                {members[activeIndex].bio && (
                  <p className="text-muted-foreground text-sm leading-relaxed italic border-l-2 border-white/10 pl-4 py-1 max-w-lg mx-auto md:mx-0">
                    "{members[activeIndex].bio}"
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {members[activeIndex].skills.slice(0, 5).map(skill => (
                    <Badge key={skill} variant="outline" className="border-white/10 bg-white/5 text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                  {members[activeIndex].skills.length > 5 && (
                    <span className="text-xs text-muted-foreground">+{members[activeIndex].skills.length - 5}</span>
                  )}
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                  {members[activeIndex].github && (
                    <Link href={members[activeIndex].github} target="_blank" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors">
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                  )}
                  {members[activeIndex].linkedin && (
                    <Link href={members[activeIndex].linkedin} target="_blank" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </Link>
                  )}
                  {members[activeIndex].instagram && (
                    <Link href={members[activeIndex].instagram} target="_blank" className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {members.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === activeIndex ? "bg-primary w-6" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
