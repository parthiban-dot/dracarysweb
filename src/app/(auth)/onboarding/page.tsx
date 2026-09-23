import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitOnboarding } from "@/actions/onboarding";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.onboarded) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center p-4">
      <LiquidGlass className="w-full max-w-2xl p-8 md:p-10 border-primary/20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold heading-dragon mb-2">Welcome to DRACARYS</h1>
          <p className="text-muted-foreground">
            Complete your profile to gain access to the member portal.
          </p>
        </div>

        <form action={submitOnboarding} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="memberTag">Member Tag / Title</Label>
              <Input 
                id="memberTag" 
                name="memberTag" 
                placeholder="e.g. Full Stack Engineer" 
                required 
                className="bg-black/50 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Input 
                id="year" 
                name="year" 
                placeholder="e.g. 3rd Year / 2026" 
                required 
                className="bg-black/50 border-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Technical Skills (Comma separated)</Label>
            <Input 
              id="skills" 
              name="skills" 
              placeholder="React, TypeScript, Node.js..." 
              required 
              className="bg-black/50 border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              placeholder="Tell us about yourself and your journey..." 
              rows={4}
              required 
              className="bg-black/50 border-white/10 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Profile (Optional)</Label>
              <Input 
                id="githubUrl" 
                name="githubUrl" 
                type="url"
                placeholder="https://github.com/yourusername" 
                className="bg-black/50 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
              <Input 
                id="linkedinUrl" 
                name="linkedinUrl" 
                type="url"
                placeholder="https://linkedin.com/in/yourusername" 
                className="bg-black/50 border-white/10"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full dragon-glow">
            Initialize Profile
          </Button>
        </form>
      </LiquidGlass>
    </div>
  );
}
