"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HackathonCard } from "@/components/features/hackathon-card";
import { EmptyState } from "@/components/shared/empty-state";

export function HackathonsClient({ initialHackathons }: { initialHackathons: any[] }) {
  const [yearFilter, setYearFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");

  const years = ["All", ...Array.from(new Set(initialHackathons.map(h => h.year)))].sort((a, b) => b.localeCompare(a));
  const results = ["All", "WINNER", "FINALIST", "PARTICIPANT", "SPECIAL_RECOGNITION"];
  
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    initialHackathons.forEach(h => h.technologies.forEach((t: string) => techs.add(t)));
    return ["All", ...Array.from(techs)];
  }, [initialHackathons]);

  const filteredHackathons = initialHackathons.filter(hack => {
    const matchesYear = yearFilter === "All" || hack.year === yearFilter;
    const matchesTech = techFilter === "All" || hack.technologies.includes(techFilter);
    const matchesResult = resultFilter === "All" || hack.result === resultFilter;
    return matchesYear && matchesTech && matchesResult;
  });

  return (
    <div>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
        <select 
          className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          {years.map(y => <option key={y} value={y} className="bg-background">{y === "All" ? "All Years" : y}</option>)}
        </select>

        <select 
          className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
        >
          {results.map(r => <option key={r} value={r} className="bg-background">{r === "All" ? "All Results" : r.replace("_", " ")}</option>)}
        </select>

        <select 
          className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
        >
          {allTechs.map(t => <option key={t} value={t} className="bg-background">{t === "All" ? "All Tech" : t}</option>)}
        </select>
      </div>

      {filteredHackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHackathons.map((hackathon, i) => (
            <motion.div 
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <HackathonCard {...hackathon} />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No hackathons found" 
          description="Try adjusting your filters."
        />
      )}
    </div>
  );
}