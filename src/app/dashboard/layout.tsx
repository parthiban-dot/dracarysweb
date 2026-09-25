import { DragonAtmosphere } from "@/components/shared/dragon-atmosphere";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DRACARYS",
  description: "Member dashboard and admin portal",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  // DB self-healing check in case JWT cookie is stale
  let currentStatus = session.user.status;
  let currentOnboarded = session.user.onboarded;

  if (currentStatus !== "APPROVED" || !currentOnboarded) {
    const { db } = await import("@/lib/db");
    const dbUser = await db.user.findUnique({ where: { id: session.user.id } });
    if (dbUser) {
      currentStatus = dbUser.status;
      currentOnboarded = dbUser.onboarded;
    }
  }

  // If user is PENDING or REJECTED, they cannot access the dashboard
  if (currentStatus !== "APPROVED") {
    redirect("/pending-approval");
  }

  if (currentStatus === "APPROVED" && !currentOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-background">
      <DragonAtmosphere />
      <DashboardSidebar session={session} />
      <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
