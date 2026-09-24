"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FolderGit2, Bell, LogOut, Settings } from "lucide-react";
import { DragonAtmosphere } from "@/components/shared/dragon-atmosphere";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-background">
      <DragonAtmosphere />
      
      {/* Premium Glass Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col relative z-20">
        <div className="absolute inset-0 scale-texture opacity-[0.03] pointer-events-none" />
        
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link className="flex items-center gap-2 group" href="/">
            <span className="text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary group-hover:opacity-80 transition-opacity">
              DRACARYS
            </span>
          </Link>
        </div>

        <div className="px-4 py-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">Member Portal</p>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                    isActive 
                      ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                  <link.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">PARTHI XII</p>
              <p className="text-xs text-muted-foreground truncate">vinayagamparthiban07...</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 px-2">
            <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-xs font-medium text-muted-foreground hover:text-white transition-colors border border-white/5">
              <Settings className="w-3.5 h-3.5"/> Settings
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-destructive/10 hover:bg-destructive/20 text-xs font-medium text-destructive transition-colors border border-destructive/20">
              <LogOut className="w-3.5 h-3.5"/> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}