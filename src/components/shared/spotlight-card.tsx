"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  size?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(59, 130, 246, 0.5)",
  size = 450,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-xl p-[1px] overflow-hidden group transition-all duration-300",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, rgba(255,255,255,0.06) 40%, transparent 70%)`
          : "rgba(255, 255, 255, 0.06)",
      }}
      {...props}
    >
      {/* Inner surface spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10 rounded-xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${size * 0.8}px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.12), transparent 50%)`,
        }}
      />
      
      {/* Card Content container */}
      <div className="relative z-0 h-full w-full rounded-[11px] bg-background/90 backdrop-blur-sm overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
