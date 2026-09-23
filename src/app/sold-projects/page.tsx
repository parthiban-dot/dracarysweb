"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/features/project-card";
import { demoProjects } from "@/lib/demo-data";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/empty-state";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

export default function SoldProjectsPage() {
  const soldProjects = useMemo(() => {
    return demoProjects.filter(project => project.status === "DELIVERED");
  }, []);

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary mr-2" />
            Commercial Work
          </div>
          <SectionHeader 
            title="Sold Projects"
            description="A premium collection of completed commercial projects delivered to real-world clients."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex justify-center gap-4 mb-12">
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 text-sm">Delivered</Badge>
            <Badge variant="outline" className="border-secondary text-secondary px-4 py-1 text-sm">Commercial</Badge>
            <Badge variant="outline" className="border-accent text-accent px-4 py-1 text-sm">Completed</Badge>
          </div>

          {soldProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soldProjects.map((project, i) => (
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
              title="No commercial projects yet"
              description="We haven't delivered any commercial projects matching the criteria."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
