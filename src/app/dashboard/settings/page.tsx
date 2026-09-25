import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Settings, Shield, User, Mail, Key } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and security.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Account Settings */}
        <LiquidGlass className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
            <User className="w-5 h-5 text-primary" /> Account Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Address</p>
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-lg">
                <Mail className="w-4 h-4 text-white/50" />
                <span className="text-white font-medium">{session.user.email}</span>
              </div>
              <p className="text-xs text-white/40 mt-2">Your email is managed via Google OAuth and cannot be changed here.</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Account Role</p>
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-lg">
                <Shield className="w-4 h-4 text-white/50" />
                <span className="text-white font-medium">{session.user.role || "MEMBER"}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Account ID</p>
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-lg">
                <Key className="w-4 h-4 text-white/50" />
                <code className="text-xs text-white/60 font-mono">{session.user.id}</code>
              </div>
            </div>
          </div>
        </LiquidGlass>

        {/* Preferences */}
        <div className="space-y-8">
          <LiquidGlass className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              Profile Management
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Looking to update your bio, tech stack, or social links? Those settings are managed in your public profile.
            </p>
            <Button asChild className="w-full dragon-glow">
              <Link href="/dashboard/profile">Edit Public Profile</Link>
            </Button>
          </LiquidGlass>
        </div>

      </div>
    </div>
  );
}