"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/features/project-card";
import { EmptyState } from "@/components/shared/empty-state";

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", "IN_PROGRESS", "COMPLETED", "INTERNAL", "OPEN_SOURCE"];

  const filteredProjects = initialProjects.filter(project => {
    return statusFilter === "All" || project.status === statusFilter;
  });

  return (
    <div>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
        <select 
          className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 flex-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statuses.map(s => <option key={s} value={s} className="bg-background">{s === "All" ? "All Statuses" : s.replace("_", " ")}</option>)}
        </select>
      </div>

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
          description="Check back later for new releases."
        />
      )}
    </div>
  );
}