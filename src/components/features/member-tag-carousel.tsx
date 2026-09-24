
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MemberTagCarouselProps {
  tags: string[];
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
  className?: string;
}

export function MemberTagCarousel({
  tags,
  selectedTag,
  onSelectTag,
  className,
}: MemberTagCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const uniqueTags = Array.from(new Set(tags.filter(Boolean)));
  if (!tags || tags.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className={cn("w-full py-12 relative", className)}>
      <div className="flex flex-col items-center justify-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground uppercase tracking-widest shadow-sm">
          Member Tags
        </div>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Select a spotlight tag to filter the directory.
        </p>
      </div>

      <div 
        className="relative w-full overflow-hidden group cursor-grab active:cursor-grabbing pb-8"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          animate={{
            background: isHovering 
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
              : `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0), transparent 40%)`,
          }}
        />

        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 md:px-12 py-4 gap-4 items-center justify-start md:justify-center relative z-10">
          {uniqueTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <motion.button
                key={tag}
                onClick={() => onSelectTag?.(isSelected ? "" : tag)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "snap-center shrink-0 relative px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden outline-none",
                  isSelected
                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border-white/20"
                    : "bg-black/40 text-muted-foreground hover:text-white border-white/5 hover:border-white/20",
                  "border backdrop-blur-md"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="spotlight-active"
                    className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
