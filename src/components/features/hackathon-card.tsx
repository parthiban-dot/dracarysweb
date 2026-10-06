"use client";

import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Trophy, Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Hackathon } from "@/types/hackathon";

export function HackathonCard(props: Hackathon) {
  return (
    <Link href={`/hackathons/${props.slug}`} className="group block h-full">
      <SpotlightCard
        className="h-full group-hover:-translate-y-1 group-hover:scale-[1.01] transition-transform duration-300"
        spotlightColor="rgba(139, 92, 246, 0.45)"
      >
        <div className="p-6 flex flex-col h-full relative">
          {/* Visual indicator for Winners */}
          {props.result === "WINNER" && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/15 translate-x-10 -translate-y-10 rounded-full blur-2xl group-hover:bg-secondary/35 transition-all" />
          )}

          <div className="mb-4 relative z-10">
            <p className="text-secondary text-xs font-bold tracking-widest uppercase mb-2">{props.organizer}</p>
            <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">{props.name}</h3>
            
            <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {props.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {props.location}</span>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-auto relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-md ${props.result === "WINNER" ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                <Trophy className="w-4 h-4" />
              </div>
              <p className="font-semibold text-sm text-foreground">{props.award}</p>
            </div>
          </div>

          <div className="flex items-center text-sm font-medium text-secondary mt-4 group-hover:translate-x-1 transition-transform relative z-10">
            Read Writeup <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
