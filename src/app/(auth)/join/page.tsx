import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitOnboarding } from "@/actions/onboarding";
import { Flame, Clock, CheckCircle2 } from "lucide-react";

export default async function JoinPage() {
  const session = await auth();

  // If user is already approved and onboarded, send to dashboard
  if (session?.user?.status === "APPROVED" && session.user.onboarded) {
    redirect("/dashboard");
  }

  // If user is pending approval and already onboarded
  if (session?.user && session.user.status === "PENDING" && session.user.onboarded) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center p-4">
        <LiquidGlass className="w-full max-w-xl p-8 text-center border-amber-500/30">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/30 mb-6">
            <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold heading-dragon mb-3">Application Under Review</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Your intake profile has been submitted and dispatched to the founder (<span className="text-primary font-mono">vinayagamparthiban07@gmail.com</span>). Your account is currently in <span className="text-amber-400 font-bold">PENDING</span> status.
          </p>
          <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-xs text-muted-foreground font-mono mb-6">
            Status: PENDING_ADMIN_APPROVAL | Account: {session.user.email}
          </div>
          <p className="text-xs text-muted-foreground">
            Once approved by the founder, you will receive full access to the member portal and project repository.
          </p>
        </LiquidGlass>
      </div>
    );
  }

  return (
    <Section className="pt-24 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-4">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>JOIN THE DRAGON COHORT</span>
          </div>
          <SectionHeader 
            title="Become a Dragon"
            description="DRACARYS is an elite, student-led collective building production-grade software, competing on global stages, and executing high-impact technical initiatives."
          />
        </div>

        {!session?.user ? (
          <LiquidGlass className="max-w-md mx-auto p-8 text-center border-primary/20">
            <h2 className="text-2xl font-bold mb-2">Step 1: Authenticate with Google</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Connect your Google account to initialize your member application.
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/join" });
              }}
            >
              <Button type="submit" size="lg" className="w-full dragon-glow text-base font-semibold">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>
            </form>
          </LiquidGlass>
        ) : (
          <LiquidGlass className="max-w-2xl mx-auto p-8 md:p-10 border-primary/20">
            <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-xs">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-bold text-foreground">Google Authenticated as {session.user.email}</p>
                <p className="text-muted-foreground">Step 2: Fill out your member profile intake form below.</p>
              </div>
            </div>

            <form action={submitOnboarding} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="memberTag">Member Tag / Signature Title</Label>
                  <Input 
                    id="memberTag" 
                    name="memberTag" 
                    placeholder="e.g. Full Stack Engineer / Prince" 
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
                <Label htmlFor="skills">Technical Stack (Comma separated)</Label>
                <Input 
                  id="skills" 
                  name="skills" 
                  placeholder="React, TypeScript, Node.js, Python, PostgreSQL..." 
                  required 
                  className="bg-black/50 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Describe your background, engineering interests, and achievements..." 
                  rows={4}
                  required 
                  className="bg-black/50 border-white/10 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub Profile URL</Label>
                  <Input 
                    id="githubUrl" 
                    name="githubUrl" 
                    type="url"
                    placeholder="https://github.com/yourusername" 
                    className="bg-black/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                  <Input 
                    id="linkedinUrl" 
                    name="linkedinUrl" 
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername" 
                    className="bg-black/50 border-white/10"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full dragon-glow font-bold text-base">
                Submit Member Intake Application
              </Button>
            </form>
          </LiquidGlass>
        )}
      </Container>
    </Section>
  );
}
