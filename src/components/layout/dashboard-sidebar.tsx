"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FolderGit2, Bell, LogOut, Settings, ShieldAlert, FileText, MessageSquare, Megaphone, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { name: "Announcements", href: "/dashboard/announcements", icon: Bell },
];

export function DashboardSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const isAdmin = session?.user?.role === "SUPER_ADMIN" || session?.user?.role === "ADMIN";

  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col relative z-20">
      <div className="absolute inset-0 scale-texture opacity-[0.03] pointer-events-none" />
      
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link className="flex items-center gap-2 group" href="/">
          <span className="text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary group-hover:opacity-80 transition-opacity">
            DRACARYS
          </span>
        </Link>
      </div>

      <div className="px-4 py-6 flex-1 overflow-y-auto hide-scrollbar">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">Member Portal</p>
        <nav className="space-y-1 mb-8">
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

        {isAdmin && (
          <>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" /> Admin Tools
            </p>
            <nav className="space-y-1">
              <Link 
                href="/dashboard/admin/applications"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  pathname.startsWith("/dashboard/admin/applications") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <FileText className="w-4 h-4" /> Applications
              </Link>
              <Link 
                href="/dashboard/admin/inquiries"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  pathname.startsWith("/dashboard/admin/inquiries") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <MessageSquare className="w-4 h-4" /> Inquiries
              </Link>
              <Link 
                href="/dashboard/admin/users"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  pathname.startsWith("/dashboard/admin/users") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Users className="w-4 h-4" /> Users & Access
              </Link>
              <Link 
                href="/dashboard/admin/announcements"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  pathname.startsWith("/dashboard/admin/announcements") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Megaphone className="w-4 h-4" /> Announcements
              </Link>
              <Link 
                href="/dashboard/admin/projects"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                  pathname.startsWith("/dashboard/admin/projects") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <FolderGit2 className="w-4 h-4" /> Manage Projects
              </Link>
            </nav>
          </>
        )}
      </div>

      <div className="mt-auto p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3 px-2 py-2">
          {session?.user?.image ? (
            <img src={session.user.image} alt="Avatar" className="w-10 h-10 rounded-full border border-primary/20 object-cover shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              {session?.user?.name?.[0] || "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{session?.user?.name || "Unknown User"}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 px-2">
          <Link href="/dashboard/settings" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-xs font-medium text-muted-foreground hover:text-white transition-colors border border-white/5">
            <Settings className="w-3.5 h-3.5"/> Settings
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md bg-destructive/10 hover:bg-destructive/20 text-xs font-medium text-destructive transition-colors border border-destructive/20 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5"/> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
