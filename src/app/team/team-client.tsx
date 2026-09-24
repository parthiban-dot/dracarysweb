"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { MemberCard } from "@/components/features/member-card";
import { MemberTagFan } from "@/components/features/member-tag-fan";
import { TeamCarousel } from "@/components/features/team-carousel";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/empty-state";

export interface TeamMemberItem {
  id: string;
  name: string;
  tag: string;
  role: string;
  skills: string[];
  year?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
}

interface TeamClientProps {
  members: TeamMemberItem[];
}

export function TeamClient({ members }: TeamClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");

  const tagsList = useMemo(() => Array.from(new Set(members.map(m => m.tag).filter(Boolean))), [members]);
  const roles = ["All", ...Array.from(new Set(members.map(m => m.role).filter(Boolean)))];
  const years = ["All", ...Array.from(new Set(members.map(m => m.year).filter((y): y is string => Boolean(y))))];

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            member.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === "All" || member.tag.toLowerCase() === selectedTag.toLowerCase();
      const matchesRole = roleFilter === "All" || member.role === roleFilter;
      const matchesYear = yearFilter === "All" || member.year === yearFilter;
      
      return matchesSearch && matchesTag && matchesRole && matchesYear;
    });
  }, [searchQuery, selectedTag, roleFilter, yearFilter, members]);

  return (
    <>
      <Section className="pt-20 pb-8 bg-background/40 border-b border-white/5">
        <Container>
          <SectionHeader 
            title="The Dragons"
            description="Our collective of engineers, designers, and visionaries."
          />

          <TeamCarousel members={members.filter(m => m.bio)} />
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Member Directory</h3>
            <p className="text-muted-foreground text-sm">Select a tag to filter members</p>
          </div>

          <MemberTagFan 
            tags={tagsList} 
            selectedTag={selectedTag}
            onSelectTag={(tag) => setSelectedTag(tag === selectedTag ? "All" : tag)}
          />
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, tag, or skill..." 
                className="pl-10 bg-black/40 border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select 
                className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 w-40"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roles.map(r => <option key={r} value={r} className="bg-background">{r}</option>)}
              </select>
              <select 
                className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 w-32"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                {years.map(y => <option key={y} value={y} className="bg-background">{y}</option>)}
              </select>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member, i) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <MemberCard {...member} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No members found"
              description="We couldn't find any dragons matching your search criteria."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
