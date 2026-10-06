"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const terminalLines = [
  { text: "$ dracarys init", delay: 0 },
  { text: "", delay: 800 },
  { text: "Building ideas...", delay: 1200 },
  { text: "Connecting minds...", delay: 2000 },
  { text: "Creating projects...", delay: 2800 },
  { text: "Deploying the future...", delay: 3600 },
  { text: "", delay: 4400 },
  { text: "STATUS: BUILDING", delay: 4800 },
];

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timeouts = terminalLines.map((line, index) => {
      return setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div className="w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-xl border border-white/10 bg-black/80 shadow-2xl overflow-hidden flex flex-col font-mono relative group">
      
      {/* Terminal Header */}
      <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center text-xs text-white/30 gap-2">
          <Terminal className="w-3 h-3" />
          bash
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 flex-1 overflow-y-auto text-sm md:text-base leading-relaxed text-white/70">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="min-h-[1.5rem]">
            {line.text.startsWith("$") ? (
              <span className="text-primary font-semibold">{line.text}</span>
            ) : line.text.startsWith("STATUS:") ? (
              <span className="text-emerald-400 font-bold">{line.text}</span>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-primary align-middle ml-1"
          />
        )}
      </div>

      {/* Subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
    </div>
  );
}