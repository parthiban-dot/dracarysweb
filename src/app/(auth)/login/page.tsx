import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Shield } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <LiquidGlass className="w-full max-w-md p-8 relative z-10 border-primary/20">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <div>
            <h1 className="text-3xl font-extrabold heading-dragon mb-2">Initialize Link</h1>
            <p className="text-muted-foreground text-sm">
              Authenticate via Google to access the DRACARYS member portal and admin tools.
            </p>
          </div>

          <div className="pt-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <Button type="submit" size="lg" className="w-full dragon-glow text-base font-semibold">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>
            </form>
          </div>

          <p className="text-xs text-muted-foreground pt-4 border-t border-white/5">
            By authenticating, you agree to the DRACARYS strictly-enforced internal security protocols.
          </p>
        </div>
      </LiquidGlass>
    </div>
  );
}
