
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface MemberTagCarouselProps {
  tags: string[];
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
  className?: string;
}

// A collection of vibrant gradients for the tags
const gradients = [
  "from-pink-500 via-rose-400 to-orange-400",
  "from-violet-600 via-purple-500 to-fuchsia-400",
  "from-blue-500 via-cyan-400 to-teal-400",
  "from-emerald-400 via-teal-400 to-cyan-500",
  "from-amber-400 via-orange-500 to-red-500",
  "from-fuchsia-600 via-pink-500 to-rose-400",
];

const getGradient = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

export function MemberTagCarousel({
  tags,
  selectedTag,
  onSelectTag,
  className,
}: MemberTagCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueTags = Array.from(new Set(tags.filter(Boolean)));
  
  if (!tags || tags.length === 0) return null;

  return (
    <div className={cn("w-full py-12 relative", className)}>
      <div className="flex flex-col items-center justify-center space-y-4 mb-10 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Interactive Spotlights
        </div>
        <p className="text-sm text-white/60 text-center max-w-sm">
          Swipe and click a vibrant tag below to filter our elite team members.
        </p>
      </div>

      <div className="relative w-full overflow-hidden group pb-8">
        {/* Fading edges for the carousel */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-8 md:px-24 py-8 gap-4 items-center justify-start relative z-0"
          style={{ scrollBehavior: "smooth" }}
        >
          {uniqueTags.map((tag) => {
            const isSelected = selectedTag === tag;
            const gradientClass = getGradient(tag);
            
            return (
              <motion.button
                key={tag}
                onClick={() => onSelectTag?.(isSelected ? "" : tag)}
                whileHover={{ scale: 1.1, y: -5, rotate: [-1, 1, 0] }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "snap-center shrink-0 relative px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 outline-none",
                  "border-2 backdrop-blur-md shadow-xl",
                  isSelected 
                    ? "text-white border-transparent" 
                    : "text-white/70 hover:text-white bg-black/50 border-white/10 hover:border-white/30"
                )}
              >
                {/* Colorful Animated Background (Only visible when selected or hovered) */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 bg-gradient-to-br",
                  gradientClass,
                  isSelected ? "opacity-100" : "group-hover/btn:opacity-20",
                  "pointer-events-none"
                )} />

                {/* Glowing Aura when selected */}
                {isSelected && (
                  <motion.div
                    layoutId="active-glow"
                    className={cn(
                      "absolute -inset-2 rounded-2xl opacity-50 blur-xl pointer-events-none bg-gradient-to-br",
                      gradientClass
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Text Content */}
                <span className="relative z-10 block tracking-wide">{tag}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
