"use client";

import { useState, useRef } from "react";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Layers } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  summary: string;
  slug: string;
  technologyStack: string[];
  status: string;
  year?: string;
  teamMembers?: any[];
  manualMembers?: string[];
}

export function ProjectCard({ title, summary, slug, technologyStack, status, year, teamMembers = [], manualMembers = [] }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const allMembers = [
    ...teamMembers.map((tm: any) => tm.user?.name || "Unknown"),
    ...manualMembers,
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Show tooltip to the right if space, else to the left
    const showRight = rect.right + 280 < window.innerWidth;
    setTooltipPos({
      x: showRight ? rect.width + 12 : -(280 + 12),
      y: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative group block h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Link href={`/projects/${slug}`} className="block h-full">
        <LiquidGlass className="h-full p-0 flex flex-col dragon-eye transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:-translate-y-1 group-hover:scale-[1.01]">
          {/* Card image area */}
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
            <div className="absolute inset-0 scale-texture opacity-20" />
            <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border-white/10">
              {status}
            </Badge>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground mb-6 flex-1 text-sm line-clamp-3">
              {summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
              {technologyStack && technologyStack.slice(0, 3).map(tech => (
                <Badge key={tech} variant="outline" className="border-white/10 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {allMembers.length > 0 && (
              <div className="mb-6 pt-4 border-t border-white/5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Team</p>
                <div className="flex flex-wrap gap-1">
                  {allMembers.map((name, idx) => (
                    <span key={idx} className="text-xs bg-white/5 border border-white/10 rounded-sm px-2 py-1 text-white/80">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center text-sm font-medium text-primary mt-auto">
              View Project <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </LiquidGlass>
      </Link>

      {/* Hover Preview Tooltip — Desktop only */}
      {hovered && (
        <div
          className="absolute top-0 z-50 w-[270px] pointer-events-none hidden md:block"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div
            className="rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] p-5"
            style={{ animation: "fadeInScale 0.18s ease-out" }}
          >
            {/* Title */}
            <p className="font-bold text-white text-base mb-2 leading-tight">{title}</p>

            {/* Full summary */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{summary}</p>

            {/* Year + Stack count */}
            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              {year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" />
                  {year}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-primary" />
                {technologyStack?.length || 0} technologies
              </span>
            </div>

            {/* Full tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {technologyStack?.slice(0, 8).map(tech => (
                <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                  {tech}
                </span>
              ))}
              {(technologyStack?.length || 0) > 8 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                  +{technologyStack.length - 8} more
                </span>
              )}
            </div>

            {/* Click hint */}
            <p className="text-[10px] text-primary/60 font-medium tracking-wide">
              Click to view full project →
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
