import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { EmptyState } from "@/components/shared/empty-state";
import { MembersClient } from "./client";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard");
  }

  let users: { id: string; name: string | null; email: string | null; role: import("@prisma/client").Role; createdAt: Date; }[] = [];
  let hasDbConnection = true;

  try {
    users = await db.user.findMany({
      include: { profile: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    hasDbConnection = false;
  }

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Members</h1>
          <p className="text-muted-foreground">Manage system users, profiles, and roles.</p>
        </div>
      </header>

      <LiquidGlass className="p-6">
        {!hasDbConnection ? (
          <EmptyState 
            title="Database Disconnected"
            description="PostgreSQL is not reachable. Cannot fetch members."
          />
        ) : users.length === 0 ? (
          <EmptyState 
            title="No Members Found"
            description="There are no users registered in the system."
          />
        ) : (
          <MembersClient initialUsers={users} currentUserRole={session.user.role} />
        )}
      </LiquidGlass>
    </div>
  );
}
