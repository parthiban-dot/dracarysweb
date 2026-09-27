import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { FolderGit2, Megaphone, Terminal, User as UserIcon } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardOverview() {
  const session = await auth();
  
  if (!session?.user) return null;

  const userWithAssignments = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: {
        include: { project: true }
      }
    }
  });

  const announcements = await prisma.announcement.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Epic Hero Header */}
      <LiquidGlass className="relative overflow-hidden p-8 md:p-12 border-white/10 mb-12 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 scale-texture opacity-[0.05]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
        
        <Terminal className="w-12 h-12 text-primary mb-6 animate-pulse" />
        
        <h1 className="heading-dragon text-4xl md:text-6xl mb-4">
          COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">CENTER</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl relative z-10">
          Welcome back, <span className="text-white font-bold">{session.user.name?.split(" ")[0]}</span>. This is your DRACARYS member portal. Let's forge the future.
        </p>
      </LiquidGlass>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column - My Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FolderGit2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">My Assigned Projects</h2>
          </div>
          
          {userWithAssignments?.projects && userWithAssignments.projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {userWithAssignments.projects.map(assignment => (
                <LiquidGlass key={assignment.id} className="p-6 border-white/10 hover:border-primary/30 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-full border border-white/10 text-white/70">
                      {assignment.role}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{assignment.project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{assignment.project.summary}</p>
                </LiquidGlass>
              ))}
            </div>
          ) : (
            <LiquidGlass className="p-8 text-center text-muted-foreground border-white/10 border-dashed">
              <FolderGit2 className="w-10 h-10 mx-auto text-white/20 mb-3" />
              <p>You have not been assigned to any projects yet.</p>
            </LiquidGlass>
          )}
        </div>

        {/* Right Column - Announcements */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">Announcements</h2>
          </div>
          
          <LiquidGlass className="p-1 border-white/10">
            <div className="divide-y divide-white/5">
              {announcements.length > 0 ? announcements.map(announcement => (
                <div key={announcement.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      announcement.priority === 'URGENT' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      announcement.priority === 'IMPORTANT' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {announcement.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{announcement.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-3">{announcement.content}</p>
                </div>
              )) : (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  No announcements yet.
                </div>
              )}
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}