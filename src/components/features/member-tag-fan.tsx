"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FanCarouselProps {
  tags: string[];
  className?: string;
  // Added optional props to satisfy team-client.tsx filtering if needed
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
}

export function MemberTagFan({ tags, className, onSelectTag }: FanCarouselProps) {
  // Center the initial active tag
  const [activeIndex, setActiveIndex] = useState(Math.floor(tags.length / 2));

  // Auto-play the carousel slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tags.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tags.length]);

  return (
    <div className={cn("relative flex justify-center items-center h-56 w-full overflow-hidden my-8", className)}>
      
      {/* Colorful Spotlight Background - Anchored to center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-primary/50 via-secondary/40 to-primary/20 blur-[90px] rounded-full pointer-events-none mix-blend-screen opacity-80 transition-opacity duration-700" />

      <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto px-4">
        {tags.map((tag, i) => {
          const isActive = i === activeIndex;
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          
          // Calculate dynamic overlap and scaling
          const zIndex = 50 - absOffset;
          const scale = isActive ? 1.2 : Math.max(0.8 - absOffset * 0.1, 0.5);
          const opacity = isActive ? 1 : Math.max(0.8 - absOffset * 0.25, 0.1);
          // Push items closer together to create a 3D overlapping carousel effect
          const x = offset * 60; 

          return (
            <motion.div
              key={tag}
              onClick={() => {
                setActiveIndex(i);
                if (onSelectTag) onSelectTag(tag);
              }}
              animate={{
                scale,
                opacity,
                zIndex,
                x,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 25,
                mass: 0.8
              }}
              className={cn(
                "absolute cursor-pointer px-6 py-3 rounded-xl backdrop-blur-xl border transition-all duration-300",
                isActive
                  ? "bg-black/60 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
              )}
            >
              <div className="absolute inset-0 scale-texture opacity-10 rounded-xl pointer-events-none" />
              <span className={cn(
                "font-extrabold tracking-widest uppercase whitespace-nowrap transition-colors duration-500 relative z-10",
                isActive 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary" 
                  : "text-muted-foreground/70"
              )}>
                {tag}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}