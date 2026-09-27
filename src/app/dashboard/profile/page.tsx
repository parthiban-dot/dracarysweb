import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { ProfileForm } from "@/components/features/profile-form";
import { Shield, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  let profile = null;
  let hasDbConnection = true;

  try {
    profile = await db.memberProfile.findUnique({
      where: { userId: session.user.id },
    });
  } catch {
    hasDbConnection = false;
  }

  const initialData = {
    name: session.user.name || "",
    bio: profile?.bio || "",
    githubUrl: profile?.githubUrl || "",
    linkedinUrl: profile?.linkedinUrl || "",
    skills: profile?.skills?.join(", ") || "",
    year: profile?.year || "",
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your public presence within the collective.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          <LiquidGlass className="p-6">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Personal Information</h2>
            
            {!hasDbConnection ? (
              <div className="text-center py-10 opacity-50">
                Database disconnected. Form disabled.
              </div>
            ) : (
              <ProfileForm initialData={initialData} />
            )}
          </LiquidGlass>
        </div>

        <div className="space-y-6">
          <LiquidGlass className="p-6 bg-black/40">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-muted-foreground">
              <Shield className="w-4 h-4" /> Role & Permissions
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Access Level</p>
                <div className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">
                    {session.user.role}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">System ID</p>
                <p className="text-sm font-mono opacity-50 truncate">{session.user.id}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3 shrink-0 mt-0.5" />
                <p>Role and permissions cannot be changed by the user. Contact a SUPER_ADMIN to request elevated access.</p>
              </div>
            </div>
          </LiquidGlass>
        </div>

      </div>
    </div>
  );
}
