import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, UserCircle, Briefcase, Bell, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/actions/auth";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Portal",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
    { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-16">
      {/* Mobile Nav Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-16 z-40">
        <span className="font-bold text-lg">Dashboard</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background border-r border-white/10 w-64 pt-16">
            <nav className="space-y-2 mt-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-500/10 text-red-500/70 hover:text-red-500 transition-colors mt-4">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </form>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-black/20 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Member Portal</p>
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
          </div>
          
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10" type="submit">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-auto md:h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
