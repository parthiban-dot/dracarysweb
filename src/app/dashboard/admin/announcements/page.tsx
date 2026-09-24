import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Megaphone, Plus } from "lucide-react";
import { AnnouncementForm } from "./announcement-form";

const prisma = new PrismaClient();

export default async function AdminAnnouncementsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-primary" /> Manage Announcements
          </h1>
          <p className="text-muted-foreground text-lg">Broadcast messages to all DRACARYS members.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {announcements.map(item => (
            <LiquidGlass key={item.id} className="p-6 border-white/10 relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {item.title}
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      item.priority === 'URGENT' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      item.priority === 'IMPORTANT' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {item.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      item.isPublished ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-white/10 text-white/50 border-white/20'
                    }`}>
                      {item.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-3 whitespace-pre-wrap">{item.content}</p>
                </div>
              </div>
            </LiquidGlass>
          ))}
          {announcements.length === 0 && (
            <LiquidGlass className="p-12 text-center text-muted-foreground border-white/10">
              No announcements created yet.
            </LiquidGlass>
          )}
        </div>

        <div className="space-y-6">
          <LiquidGlass className="p-6 border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> New Announcement
            </h2>
            <AnnouncementForm />
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}
