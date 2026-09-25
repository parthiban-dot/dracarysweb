import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { adminAddMember } from "@/actions/admin-add-member";

export default async function AddMemberPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
          <UserPlus className="w-8 h-8 text-primary" /> Manually Add Member
        </h1>
        <p className="text-muted-foreground text-lg">
          Add a custom member to the DRACARYS public team roster.
        </p>
      </div>

      <LiquidGlass className="p-8 border-white/10">
        <form action={adminAddMember} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="e.g. John Doe" 
                required 
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memberTag">Member Tag</Label>
              <Input 
                id="memberTag" 
                name="memberTag" 
                placeholder="e.g. Full Stack Developer" 
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
                placeholder="e.g. 2026" 
                required 
                className="bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role Type</Label>
              <select 
                id="role" 
                name="role" 
                className="w-full bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 text-white"
              >
                <option value="MEMBER">Member</option>
                <option value="PROJECT_LEAD">Project Lead</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Tech Stack (Comma separated)</Label>
            <Input 
              id="skills" 
              name="skills" 
              placeholder="e.g. React, Next.js, Python, PostgreSQL" 
              required 
              className="bg-black/40 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              placeholder="Describe their role and interests..." 
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
                placeholder="https://github.com/..." 
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
              <Input 
                id="linkedinUrl" 
                name="linkedinUrl" 
                type="url"
                placeholder="https://linkedin.com/in/..." 
                className="bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram Profile URL</Label>
              <Input 
                id="instagramUrl" 
                name="instagramUrl" 
                type="url"
                placeholder="https://instagram.com/..." 
                className="bg-black/40 border-white/10"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full dragon-glow font-bold mt-4">
            Add Team Member
          </Button>
        </form>
      </LiquidGlass>
    </div>
  );
}
