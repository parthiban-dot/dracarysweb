import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";

export default function LoadingHackathons() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent pt-32 pb-16">
      <Section className="relative z-10">
        <Container>
          <div className="mb-12">
            <div className="h-10 w-72 bg-white/10 rounded-md animate-pulse mb-4"></div>
            <div className="h-4 w-96 bg-white/5 rounded-md animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <LiquidGlass key={i} className="h-64 border-white/5 p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="h-8 w-1/2 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse"></div>
                </div>
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse mb-2"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <div className="h-6 w-20 bg-white/5 rounded-full animate-pulse"></div>
                  <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse"></div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}