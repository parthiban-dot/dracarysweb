"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { HackathonCard } from "@/components/features/hackathon-card";
import { demoHackathons } from "@/lib/demo-data";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/empty-state";

export default function HackathonsPage() {
  const [yearFilter, setYearFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");

  const years = ["All", ...Array.from(new Set(demoHackathons.map(h => h.year)))];
  const results = ["All", "WINNER", "FINALIST", "PARTICIPANT", "SPECIAL_RECOGNITION"];
  
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    demoHackathons.forEach(h => h.technologies.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs)];
  }, []);

  const filteredHackathons = demoHackathons.filter(hack => {
    const matchesYear = yearFilter === "All" || hack.year === yearFilter;
    const matchesTech = techFilter === "All" || hack.technologies.includes(techFilter);
    const matchesResult = resultFilter === "All" || hack.result === resultFilter;
    return matchesYear && matchesTech && matchesResult;
  });

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary/10 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <SectionHeader 
            title="Hackathon Glory"
            description="A timeline of our victories, losses, and late-night architectural sprints."
          />
          
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mt-8">
            <select 
              className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary h-10 flex-1"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {years.map(y => <option key={y} value={y} className="bg-background">{y === "All" ? "All Years" : y}</option>)}
            </select>
            
            <select 
              className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary h-10 flex-1"
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
            >
              {results.map(r => <option key={r} value={r} className="bg-background">{r === "All" ? "All Results" : r.replace("_", " ")}</option>)}
            </select>

            <select 
              className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary h-10 flex-1"
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
            >
              {allTechs.map(t => <option key={t} value={t} className="bg-background">{t === "All" ? "All Technologies" : t}</option>)}
            </select>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {filteredHackathons.length > 0 ? (
            <div className="relative border-l-2 border-white/10 pl-6 md:pl-12 ml-4 md:ml-6 space-y-12">
              {filteredHackathons.map((hackathon, i) => (
                <motion.div 
                  key={hackathon.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full border-4 border-background ${hackathon.result === 'WINNER' ? 'bg-secondary' : 'bg-primary'}`} />
                  
                  <HackathonCard {...hackathon} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No events found"
              description="No hackathons match your current filters."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
