import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { db } from "@/lib/db";
import { EmptyState } from "@/components/shared/empty-state";
import { Bell } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardAnnouncementsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  let announcements: { id: string; title: string; content: string; createdAt: Date; isPublished: boolean; authorId: string; updatedAt: Date; }[] = [];
  let hasDbConnection = true;

  try {
    announcements = await db.announcement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    hasDbConnection = false;
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Announcements</h1>
        <p className="text-muted-foreground">Important updates and broadcasts from the collective leadership.</p>
      </header>

      {!hasDbConnection ? (
         <EmptyState 
           title="Database Disconnected"
           description="Cannot fetch announcements. Please ensure PostgreSQL is running."
         />
      ) : announcements.length === 0 ? (
        <EmptyState 
          title="All Caught Up"
          description="There are no active announcements at this time."
        />
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <LiquidGlass key={announcement.id} className="p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <div className="flex items-center gap-3 mb-4 text-accent">
                <Bell className="w-5 h-5" />
                <span className="text-sm font-mono">{new Date(announcement.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{announcement.title}</h3>
              <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {announcement.content}
              </div>
            </LiquidGlass>
          ))}
        </div>
      )}
    </div>
  );
}
