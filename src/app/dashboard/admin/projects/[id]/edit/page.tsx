import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { FolderGit2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditProjectForm } from "./edit-project-form";

const prisma = new PrismaClient();

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const dbProject = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      teamMembers: true
    }
  });

  const project = dbProject ? {
    ...dbProject,
    createdAt: dbProject.createdAt.toISOString(),
    updatedAt: dbProject.updatedAt.toISOString(),
    publishedAt: dbProject.publishedAt ? dbProject.publishedAt.toISOString() : null
  } : null;

  if (!project) {
    redirect("/dashboard/admin/projects");
  }

  const dbUsers = await prisma.user.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" }
  });

  const allUsers = dbUsers.map(u => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
    emailVerified: u.emailVerified ? u.emailVerified.toISOString() : null
  }));

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/projects" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-1 flex items-center gap-3">
            Edit Project
          </h1>
          <p className="text-muted-foreground text-sm">Update details and manage team members for {project.title}.</p>
        </div>
      </div>

      <LiquidGlass className="p-8 border-white/10">
        <EditProjectForm project={project} users={allUsers} />
      </LiquidGlass>
    </div>
  );
}