
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DragonAtmosphere() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] bg-[#05050a] overflow-hidden">
      
      {/* Subtle Hex Texture Background */}
      <div className="absolute inset-0 scale-texture opacity-[0.03]" />
      
      {/* Glowing atmospheric orbs (very subtle) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"
      />
      
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]"
      />
      
      {/* Minimal Abstract Dragon Eye in center (extremely faded) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] mix-blend-screen w-[800px] h-[800px]">
        <svg viewBox="0 0 800 800" className="w-full h-full text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M400 100 C150 100 0 350 0 400 C0 450 150 700 400 700 C650 700 800 450 800 400 C800 350 650 100 400 100 Z M400 600 C250 600 100 450 100 400 C100 350 250 200 400 200 C550 200 700 350 700 400 C700 450 550 600 400 600 Z" />
          <path d="M400 250 C320 250 250 320 250 400 C250 480 320 550 400 550 C480 550 550 480 550 400 C550 320 480 250 400 250 Z M400 500 C345 500 300 455 300 400 C300 345 345 300 400 300 C455 300 500 345 500 400 C500 455 455 500 400 500 Z" />
          <path d="M400 320 C380 320 350 360 350 400 C350 440 380 480 400 480 C420 480 450 440 450 400 C450 360 420 320 400 320 Z" />
        </svg>
      </div>

    </div>
  );
}
