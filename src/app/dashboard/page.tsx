import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { db } from "@/lib/db";
import { Trophy, Code2, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  let profile = null;
  let activeProjects = 0;
  let hasDbConnection = true;

  try {
    profile = await db.memberProfile.findUnique({
      where: { userId: session.user.id },
    });
    
    // In a real scenario, this would count actual project relations
    activeProjects = await db.projectMember.count({
      where: { userId: session.user.id },
    });
  } catch {
    // Graceful degradation if DB is not connected yet
    hasDbConnection = false;
  }

  const profileCompleteness = profile ? 
    ((profile.bio ? 25 : 0) + (profile.skills.length > 0 ? 25 : 0) + (profile.githubUrl ? 25 : 0) + (profile.linkedinUrl ? 25 : 0))
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!hasDbConnection && (
        <div className="bg-destructive/20 border border-destructive text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">Database Disconnected</h4>
            <p className="text-sm opacity-90">Please ensure PostgreSQL is running and migrations are applied to view live data.</p>
          </div>
        </div>
      )}

      <header>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user.name?.split(" ")[0] || "Hacker"}</h1>
        <p className="text-muted-foreground">Here is what is happening across the organization today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">{hasDbConnection ? activeProjects : 0}</h2>
        </LiquidGlass>

        {/* Stat Card 2 */}
        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Hackathons Won</p>
            <Trophy className="w-4 h-4 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold">0</h2>
        </LiquidGlass>

        {/* Profile Completeness */}
        <LiquidGlass className="p-6 border-white/10 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">Profile Setup</p>
            <span className="text-sm font-bold text-accent">{profileCompleteness}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-1000"
              style={{ width: `${profileCompleteness}%` }}
            />
          </div>
        </LiquidGlass>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcements Preview */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-white/10 pb-2">Recent Announcements</h3>
          <LiquidGlass className="p-6 bg-black/20 border-dashed">
            <p className="text-muted-foreground text-center py-6">No new announcements at this time.</p>
          </LiquidGlass>
        </div>

        {/* Projects Preview */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold border-b border-white/10 pb-2">Your Projects</h3>
          <LiquidGlass className="p-6 bg-black/20 border-dashed">
            <p className="text-muted-foreground text-center py-6">You are not assigned to any active projects.</p>
          </LiquidGlass>
        </div>
      </div>

    </div>
  );
}
