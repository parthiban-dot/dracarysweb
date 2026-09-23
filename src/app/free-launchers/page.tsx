"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { LauncherCard } from "@/components/features/launcher-card";
import { demoLaunchers } from "@/lib/demo-data";
import { useState } from "react";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FreeLaunchersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");

  const categories = ["All", "STARTER_KIT", "TOOL", "UTILITY", "DEMO", "EXPERIMENT", "TEMPLATE"];
  const licenses = ["All", "MIT", "APACHE_2.0", "GPL_3.0", "PROPRIETARY"];

  const filteredLaunchers = demoLaunchers.filter(launcher => {
    const matchesSearch = launcher.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          launcher.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || launcher.category === categoryFilter;
    const matchesLicense = licenseFilter === "All" || launcher.license === licenseFilter;
    return matchesSearch && matchesCategory && matchesLicense;
  });

  return (
    <>
      <Section className="pt-20 pb-12 bg-background/40 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <SectionHeader 
            title="Free Launchers"
            description="Open-source tools, boilerplates, and utilities released by DRACARYS."
          />
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search tools & boilerplates..." 
                className="pl-10 bg-black/40 border-white/10 focus-visible:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select 
                className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent h-10 w-40"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c} className="bg-background">{c === "All" ? "All Categories" : c.replace("_", " ")}</option>)}
              </select>
              
              <select 
                className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent h-10 w-40"
                value={licenseFilter}
                onChange={(e) => setLicenseFilter(e.target.value)}
              >
                {licenses.map(l => <option key={l} value={l} className="bg-background">{l === "All" ? "All Licenses" : l.replace("_", " ")}</option>)}
              </select>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {filteredLaunchers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaunchers.map((launcher, i) => (
                <motion.div 
                  key={launcher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <LauncherCard {...launcher} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No releases found"
              description="No launchers match your current filters."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
