import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { FolderGit2 } from "lucide-react";

export default async function AdminProjectsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
          <FolderGit2 className="w-8 h-8 text-primary" /> Manage Projects
        </h1>
        <p className="text-muted-foreground text-lg">Add, edit, or remove DRACARYS showcase projects.</p>
      </div>

      <LiquidGlass className="p-12 text-center text-muted-foreground border-white/10">
        Project management module is coming soon.
      </LiquidGlass>
    </div>
  );
}
