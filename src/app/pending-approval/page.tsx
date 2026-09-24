import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { ShieldAlert, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function PendingApprovalPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }
  
  if (session.user.status === "APPROVED") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-32 pb-16">
      <Section className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <Container className="max-w-xl">
          <LiquidGlass heavy className="p-10 text-center border-yellow-500/20 dragon-glow-violet">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <ShieldAlert className="w-10 h-10 text-yellow-500" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-white mb-4">Verification Pending</h1>
            
            {session.user.status === "REJECTED" ? (
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your request to join DRACARYS has been reviewed and unfortunately cannot be approved at this time. If you believe this is an error, please contact the administrators.
              </p>
            ) : (
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your account is currently under review by the DRACARYS root administrators. 
                Because we treat every project like a production-grade startup, access to the internal dashboard requires strict approval.
                <br/><br/>
                Please wait until your account is approved.
              </p>
            )}

            <div className="flex justify-center">
              <SignOutButton />
            </div>
          </LiquidGlass>
        </Container>
      </Section>
    </div>
  );
}
