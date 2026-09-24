"use client";

import { motion } from "framer-motion";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { EmptyState } from "@/components/shared/empty-state";
import { FolderGit2, Trophy, Bell, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Framer motion variants for staggering children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function DashboardOverview() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      
      {/* Header */}
      <motion.div variants={item} className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">
          Welcome back, <span className="text-primary">PARTHI</span>
        </h1>
        <p className="text-muted-foreground text-lg">Here is what is happening across the organization today.</p>
      </motion.div>

      {/* Bento Grid Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Projects Card */}
        <LiquidGlass className="p-6 relative overflow-hidden group hover:border-primary/40 dragon-glow cursor-pointer">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FolderGit2 className="w-24 h-24 text-primary"/>
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <FolderGit2 className="w-5 h-5"/>
              </div>
              <h3 className="font-semibold text-muted-foreground">Active Projects</h3>
            </div>
            <div>
              <span className="text-5xl font-black text-white">0</span>
            </div>
          </div>
        </LiquidGlass>

        {/* Hackathons Won Card */}
        <LiquidGlass className="p-6 relative overflow-hidden group hover:border-secondary/40 dragon-glow-violet cursor-pointer">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-24 h-24 text-secondary"/>
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                <Trophy className="w-5 h-5"/>
              </div>
              <h3 className="font-semibold text-muted-foreground">Hackathons Won</h3>
            </div>
            <div>
              <span className="text-5xl font-black text-white">0</span>
            </div>
          </div>
        </LiquidGlass>

        {/* Profile Setup Progress Card */}
        <LiquidGlass className="p-6 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-primary/[0.05]">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-semibold text-white">Profile Setup</h3>
            <span className="text-2xl font-black text-primary">100%</span>
          </div>
          <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-secondary relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[shimmer_1s_linear_infinite]" />
            </motion.div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500"/> Your profile is ready for production.
          </p>
        </LiquidGlass>
      </motion.div>

      {/* Bottom Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Announcements */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary"/> Recent Announcements
            </h2>
            <Link className="text-xs text-primary hover:underline flex items-center" href="/dashboard/announcements">
              View all <ChevronRight className="w-3 h-3 ml-1"/>
            </Link>
          </div>
          <EmptyState 
            icon={<Bell className="w-8 h-8 text-primary/50" />}
            title="All caught up!" 
            description="There are no new announcements from the DRACARYS admin team at this time." 
          />
        </motion.div>

        {/* Projects */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-secondary"/> Your Projects
            </h2>
            <Link className="text-xs text-secondary hover:underline flex items-center" href="/dashboard/projects">
              Browse projects <ChevronRight className="w-3 h-3 ml-1"/>
            </Link>
          </div>
          <EmptyState 
            icon={<FolderGit2 className="w-8 h-8 text-secondary/50" />}
            title="No Active Assignments" 
            description="You are not currently assigned to any active production projects." 
          />
        </motion.div>
      </div>

    </motion.div>
  );
}