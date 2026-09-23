import { auth } from "@/auth";
import { db } from "@/lib/db";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Users, Briefcase, Trophy, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();

  let stats = {
    users: 0,
    projects: 0,
    hackathons: 0,
    enquiries: 0
  };

  try {
    const [u, p, h, e] = await Promise.all([
      db.user.count(),
      db.project.count(),
      db.hackathon.count(),
      db.contactSubmission.count()
    ]);
    stats = { users: u, projects: p, hackathons: h, enquiries: e };
  } catch (err) {
    // Graceful fail if DB disconnected
  }

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and content management.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LiquidGlass className="p-6 border-white/10">
          <div className="flex items-center justify-between mb-4 text-muted-foreground">
            <span className="text-sm font-medium">Total Members</span>
            <Users className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-bold">{stats.users}</h2>
        </LiquidGlass>
        
        <LiquidGlass className="p-6 border-white/10">
          <div className="flex items-center justify-between mb-4 text-muted-foreground">
            <span className="text-sm font-medium">Projects</span>
            <Briefcase className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-bold">{stats.projects}</h2>
        </LiquidGlass>

        <LiquidGlass className="p-6 border-white/10">
          <div className="flex items-center justify-between mb-4 text-muted-foreground">
            <span className="text-sm font-medium">Hackathons</span>
            <Trophy className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-bold">{stats.hackathons}</h2>
        </LiquidGlass>

        <LiquidGlass className="p-6 border-white/10">
          <div className="flex items-center justify-between mb-4 text-muted-foreground">
            <span className="text-sm font-medium">New Enquiries</span>
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-bold">{stats.enquiries}</h2>
        </LiquidGlass>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-white/10 pb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
               <span className="block font-bold mb-1">Add Member</span>
               <span className="text-xs text-muted-foreground">Provision a new user account</span>
             </div>
             <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
               <span className="block font-bold mb-1">New Announcement</span>
               <span className="text-xs text-muted-foreground">Broadcast to all members</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
