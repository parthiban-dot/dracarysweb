import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCog } from "lucide-react";
import { adminUpdateMember } from "@/actions/admin-edit-member";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true }
  });

  if (!user) {
    redirect("/dashboard/admin/users");
  }

  // Pre-bind the server action with the user ID
  const updateAction = adminUpdateMember.bind(null, user.id);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
          <UserCog className="w-8 h-8 text-primary" /> Edit Member
        </h1>
        <p className="text-muted-foreground text-lg">
          Modify details, roles, and profile information for {user.name}.
        </p>
      </div>

      <LiquidGlass className="p-8 border-white/10">
        <form action={updateAction} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={user.name || ""} 
                required 
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memberTag">Member Tag</Label>
              <Input 
                id="memberTag" 
                name="memberTag" 
                defaultValue={user.profile?.memberTag || ""} 
                required 
                className="bg-black/40 border-white/10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study / Grad Year</Label>
              <Input 
                id="year" 
                name="year" 
                defaultValue={user.profile?.year || ""} 
                className="bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role Type</Label>
              <select 
                id="role" 
                name="role"
                defaultValue={user.role} 
                className="w-full bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 text-white"
              >
                <option value="MEMBER">Member</option>
                <option value="PROJECT_LEAD">Project Lead</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Tech Stack (Comma separated)</Label>
            <Input 
              id="skills" 
              name="skills" 
              defaultValue={user.profile?.skills?.join(", ") || ""} 
              required 
              className="bg-black/40 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              defaultValue={user.profile?.bio || ""} 
              className="bg-black/40 border-white/10 resize-none h-24"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Profile URL</Label>
              <Input 
                id="githubUrl" 
                name="githubUrl" 
                type="url"
                defaultValue={user.profile?.githubUrl || ""} 
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
              <Input 
                id="linkedinUrl" 
                name="linkedinUrl" 
                type="url"
                defaultValue={user.profile?.linkedinUrl || ""} 
                className="bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram Profile URL</Label>
              <Input 
                id="instagramUrl" 
                name="instagramUrl" 
                type="url"
                defaultValue={user.profile?.instagramUrl || ""} 
                className="bg-black/40 border-white/10"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link href="/dashboard/admin/users" className="flex-1">
              <Button type="button" variant="outline" size="lg" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg" className="flex-1 dragon-glow font-bold">
              Save Changes
            </Button>
          </div>
        </form>
      </LiquidGlass>
    </div>
  );
}
