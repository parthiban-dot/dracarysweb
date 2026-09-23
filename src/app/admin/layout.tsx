import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, Users, Briefcase, Trophy, 
  Rocket, Bell, Mail, Image as ImageIcon, 
  Settings, ShieldAlert, LogOut, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/actions/auth";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // STRICT SERVER-SIDE AUTHORIZATION
  const role = session.user.role;
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard"); // Kick out unauthorized roles
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Members", href: "/admin/members", icon: Users },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Hackathons", href: "/admin/hackathons", icon: Trophy },
    { name: "Announcements", href: "/admin/announcements", icon: Bell },
    { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-16">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-16 z-40">
        <span className="font-bold text-lg text-accent">DRACARYS Admin</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background border-r border-white/10 w-64 pt-16">
            <nav className="space-y-1 mt-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-black/40 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> System Admin
          </p>
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-auto md:h-[calc(100vh-4rem)] relative">
        {children}
      </main>
    </div>
  );
}
