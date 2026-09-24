import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = !!params.error;

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
            <h1 className="text-3xl font-extrabold heading-dragon mb-2">Member Portal Login</h1>
            <p className="text-muted-foreground text-sm">
              Restricted to approved DRACARYS members.
            </p>
          </div>

          {hasError && (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Access Restricted</span>
              </div>
              <p>
                Your account is either pending admin approval or not registered. Only approved members can log in.
              </p>
              <div className="pt-1">
                <Link href="/join" className="text-primary hover:underline font-semibold flex items-center gap-1">
                  Apply via /join intake form &rarr;
                </Link>
              </div>
            </div>
          )}

          <div className="pt-2">
            <GoogleSignInButton />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/5">
            <span>Not a member yet?</span>
            <Link href="/join" className="text-primary hover:underline font-bold">
              Join DRACARYS
            </Link>
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}