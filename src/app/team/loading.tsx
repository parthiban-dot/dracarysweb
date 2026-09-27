import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";

export default function LoadingTeam() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent pt-32 pb-16">
      <Section className="relative z-10">
        <Container>
          <div className="mb-16 text-center">
            <div className="h-12 w-64 bg-white/10 rounded-md animate-pulse mb-6 mx-auto"></div>
            <div className="h-4 w-96 bg-white/5 rounded-md animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <LiquidGlass key={i} className="h-48 border-white/5 p-6 flex flex-col items-center justify-center gap-4 text-center">
                <div className="h-16 w-16 bg-white/10 rounded-full animate-pulse"></div>
                <div className="space-y-2 w-full flex flex-col items-center">
                  <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}