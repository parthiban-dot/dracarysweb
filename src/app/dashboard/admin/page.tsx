import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db as prisma } from "@/lib/db";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { ShieldAlert, Users, FolderGit2, Trophy, FileText, Activity } from "lucide-react";
import Link from "next/link";



export default async function AdminOverviewPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  // Fetch all counts in parallel for performance
  const [
    totalUsers,
    pendingApps,
    totalProjects,
    totalHackathons,
    recentUsers,
    recentProjects
  ] = await Promise.all([
    prisma.user.count({ where: { status: "APPROVED" } }),
    prisma.joinApplication.count({ where: { status: "NEW" } }),
    prisma.project.count(),
    prisma.hackathon.count(),
    prisma.user.findMany({ 
      take: 5, 
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, status: true, role: true }
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, status: true }
    })
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <LiquidGlass className="relative overflow-hidden p-8 md:p-12 border-white/10 mb-8 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 scale-texture opacity-[0.05]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <Activity className="w-12 h-12 text-primary mb-6 animate-pulse" />
        
        <h1 className="heading-dragon text-4xl md:text-5xl mb-4 text-white">
          ADMIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ANALYTICS</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl relative z-10">
          Command center overview. Monitor collective growth, incoming applications, and active builds.
        </p>
      </LiquidGlass>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Members</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-white">{totalUsers}</p>
        </LiquidGlass>
        
        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pending Apps</h3>
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-white">{pendingApps}</p>
            {pendingApps > 0 && <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full mb-1">Needs Review</span>}
          </div>
        </LiquidGlass>

        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Projects</h3>
            <FolderGit2 className="w-5 h-5 text-fuchsia-400" />
          </div>
          <p className="text-4xl font-bold text-white">{totalProjects}</p>
        </LiquidGlass>

        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Hackathons</h3>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-4xl font-bold text-white">{totalHackathons}</p>
        </LiquidGlass>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LiquidGlass className="p-6 border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Recent Members
          </h2>
          <div className="space-y-4">
            {recentUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div>
                  <p className="font-semibold text-sm text-white">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wider ${
                  user.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500' : 
                  user.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
            <Link href="/dashboard/admin/users" className="block text-center text-xs font-semibold text-primary hover:text-primary/80 mt-4 transition-colors">
              View All Members &rarr;
            </Link>
          </div>
        </LiquidGlass>

        <LiquidGlass className="p-6 border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-primary" /> Recent Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map(proj => (
              <div key={proj.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="font-semibold text-sm text-white">{proj.title}</p>
                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold uppercase tracking-wider">
                  {proj.status.replace("_", " ")}
                </span>
              </div>
            ))}
            <Link href="/dashboard/admin/projects" className="block text-center text-xs font-semibold text-primary hover:text-primary/80 mt-4 transition-colors">
              Manage All Projects &rarr;
            </Link>
          </div>
        </LiquidGlass>
      </div>

    </div>
  );
}