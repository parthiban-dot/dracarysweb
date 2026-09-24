"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/features/project-card";
import { demoProjects } from "@/lib/demo-data";
import { useState } from "react";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/empty-state";

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");

  const statuses = ["All", "IN PROGRESS", "COMPLETED", "INTERNAL", "OPEN SOURCE"];
  
  // Extract unique technologies without useMemo
  const allTechs = ["All", ...Array.from(new Set(demoProjects.flatMap(p => p.technologyStack)))];

  const filteredProjects = demoProjects.filter(project => {
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    const matchesTech = techFilter === "All" || project.technologyStack.includes(techFilter);
    return matchesStatus && matchesTech;
  });

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5">
        <Container>
          <SectionHeader 
            title="Projects Archive"
            description="Explore our repository of built solutions."
          />
          
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mt-8">
            <select 
              className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statuses.map(s => <option key={s} value={s} className="bg-background">{s === "All" ? "All Statuses" : s}</option>)}
            </select>
            
            <select 
              className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
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
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No projects found"
              description="No projects match your current filters."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
