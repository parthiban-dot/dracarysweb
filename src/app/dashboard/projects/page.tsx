import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { db } from "@/lib/db";
import { EmptyState } from "@/components/shared/empty-state";
import { Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  let projects: { userRole: string; id: string; title: string; slug: string; summary: string; type: string; status: import("@prisma/client").ProjectStatus; year: string; problem: string; solution: string; features: string[]; technologyStack: string[]; coverImage: string | null; screenshots: string[]; demoUrl: string | null; repositoryUrl: string | null; outcome: string | null; clientVisibility: import("@prisma/client").Visibility; publishedAt: Date | null; createdAt: Date; updatedAt: Date; }[] = [];
  let hasDbConnection = true;

  try {
    const memberships = await db.projectMember.findMany({
      where: { userId: session.user.id },
      include: {
        project: true
      }
    });
    projects = memberships.map(m => ({ ...m.project, userRole: m.role }));
  } catch {
    hasDbConnection = false;
  }

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">My Projects</h1>
        <p className="text-muted-foreground">Projects you are actively assigned to or have contributed to.</p>
      </header>

      {!hasDbConnection ? (
         <EmptyState 
           title="Database Disconnected"
           description="Cannot fetch projects. Please ensure PostgreSQL is running."
         />
      ) : projects.length === 0 ? (
        <EmptyState 
          title="No Assigned Projects"
          description="You have not been assigned to any internal or commercial projects yet."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <LiquidGlass key={project.id} className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-md bg-primary/20 text-primary">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono bg-white/5 px-2 py-1 border border-white/10 rounded text-muted-foreground">
                  Role: {project.userRole}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
                {project.summary}
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <span className={`text-xs font-bold px-2 py-1 rounded ${project.status === 'DELIVERED' ? 'bg-secondary/20 text-secondary' : 'bg-white/10'}`}>
                  {project.status.replace("_", " ")}
                </span>
                <Button asChild variant="ghost" size="sm" className="hover:bg-primary/20 hover:text-primary">
                  <Link href={`/projects/${project.slug}`}>
                    View Details <ExternalLink className="w-3 h-3 ml-2" />
                  </Link>
                </Button>
              </div>
            </LiquidGlass>
          ))}
        </div>
      )}
    </div>
  );
}
