"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Flame } from "lucide-react";

export interface FanCarouselProps {
  tags: string[];
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
  className?: string;
}

export function MemberTagFan({
  tags,
  selectedTag,
  onSelectTag,
  className,
}: FanCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!tags || tags.length === 0) return null;

  // Deduplicate and filter empty tags
  const uniqueTags = Array.from(new Set(tags.filter(Boolean)));
  const total = uniqueTags.length;

  return (
    <div className={cn("w-full py-8 overflow-hidden relative", className)}>
      <div className="flex flex-col items-center justify-center space-y-4 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
          <Flame className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>DRAGON COHORT TAGS</span>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Hover or click on a tag wing to filter team members by their unique signature.
        </p>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[260px] flex items-center justify-center">
        {/* Central aura glow */}
        <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative flex items-center justify-center w-full max-w-3xl h-48">
          <AnimatePresence>
            {uniqueTags.map((tag, index) => {
              // Calculate fan rotation arc
              const centerIndex = (total - 1) / 2;
              const offset = index - centerIndex;
              
              // Angle spread calculation: max -25deg to +25deg
              const baseAngle = total > 1 ? (offset / centerIndex) * 22 : 0;
              const isHovered = hoveredIndex === index;
              const isSelected = selectedTag === tag;

              // Compute X and Y offsets for wing fan shape
              const xPos = offset * (total > 6 ? 42 : 55);
              const yPos = Math.abs(offset) * 8 - (isHovered ? 24 : 0);
              const rotate = isHovered ? 0 : baseAngle;

              return (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag?.(isSelected ? "All" : tag)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    x: xPos,
                    y: isSelected ? yPos - 30 : yPos,
                    rotate: isSelected ? 0 : rotate,
                    scale: isHovered || isSelected ? 1.15 : 1,
                    zIndex: isHovered || isSelected ? 40 : 20 - Math.abs(Math.round(offset)),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={cn(
                    "absolute cursor-pointer px-4 py-3 sm:px-6 sm:py-4 rounded-xl border font-mono text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-xl transition-colors shadow-2xl select-none group",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_30px_rgba(59,130,246,0.6)] ring-2 ring-primary/50"
                      : isHovered
                      ? "bg-black/80 text-primary border-primary/60 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "bg-black/60 text-foreground/80 border-white/10 hover:border-primary/40"
                  )}
                  style={{
                    transformOrigin: "bottom center",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary group-hover:rotate-12 transition-transform">#</span>
                    <span>{tag}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />}
                  </div>

                  {/* Flame accent indicator on card edge */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full transition-all duration-300",
                      isSelected
                        ? "bg-white shadow-[0_0_10px_#fff]"
                        : isHovered
                        ? "bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        : "bg-transparent"
                    )}
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
