"use client";

import { useEffect, useRef } from "react";

const techItems = [
  "Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion",
  "Python", "FastAPI", "Node.js", "PostgreSQL", "Prisma",
  "LangChain", "PyTorch", "Docker", "Vercel", "GitHub Actions",
  "Supabase", "Redis", "Solidity", "GraphQL", "Three.js",
  "Hugging Face", "OpenCV", "AWS", "Cloudflare", "Rust",
];

// Duplicate for seamless loop
const items = [...techItems, ...techItems];

export function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-4 w-max animate-marquee"
        style={{ willChange: "transform" }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/60 whitespace-nowrap hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
