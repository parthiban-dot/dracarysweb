import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";

export default function LoadingProjects() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent pt-32 pb-16">
      <Section className="relative z-10">
        <Container>
          <div className="mb-12">
            <div className="h-10 w-64 bg-white/10 rounded-md animate-pulse mb-4"></div>
            <div className="h-4 w-96 bg-white/5 rounded-md animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <LiquidGlass key={i} className="h-80 border-white/5 p-0 overflow-hidden flex flex-col">
                {/* Image skeleton */}
                <div className="h-40 w-full bg-white/5 animate-pulse"></div>
                {/* Content skeleton */}
                <div className="p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
                    <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse"></div>
                    <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </LiquidGlass>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}