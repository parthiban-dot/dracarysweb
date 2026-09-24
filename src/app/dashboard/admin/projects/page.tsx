import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { FolderGit2, Plus, Users } from "lucide-react";
import Link from "next/link";
import { ProjectForm } from "./project-form";

const prisma = new PrismaClient();

export default async function AdminProjectsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teamMembers: {
        include: { user: true }
      }
    }
  });

  const allUsers = await prisma.user.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
            <FolderGit2 className="w-8 h-8 text-primary" /> Manage Projects
          </h1>
          <p className="text-muted-foreground text-lg">Create projects and assign members.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {projects.map(project => (
            <LiquidGlass key={project.id} className="p-6 border-white/10 relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {project.title}
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {project.status}
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{project.summary}</p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-white/5 pt-4">
                <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Assigned Team
                </h4>
                {project.teamMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.teamMembers.map(member => (
                      <div key={member.id} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-sm border border-white/10">
                        {member.user.image && <img src={member.user.image} className="w-5 h-5 rounded-full" alt="" />}
                        <span className="text-white/90">{member.user.name}</span>
                        <span className="text-muted-foreground text-xs">({member.role})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No members assigned yet.</p>
                )}
              </div>
            </LiquidGlass>
          ))}
          {projects.length === 0 && (
            <LiquidGlass className="p-12 text-center text-muted-foreground border-white/10">
              No projects created yet.
            </LiquidGlass>
          )}
        </div>

        <div className="space-y-6">
          <LiquidGlass className="p-6 border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Create Project
            </h2>
            <ProjectForm users={allUsers} />
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}
