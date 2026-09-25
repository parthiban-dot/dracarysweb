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

  // If user is PENDING or REJECTED, they cannot access the dashboard
  if (session.user.status !== "APPROVED") {
    redirect("/pending-approval");
  }

  if (session.user.status === "APPROVED" && !session.user.onboarded) {
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
