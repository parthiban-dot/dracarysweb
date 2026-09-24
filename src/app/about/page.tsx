
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Rocket, Target, Shield, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DRACARYS | Our Motive & Innovation",
  description: "Bridging the gap between academic theory and production-grade engineering.",
};

const pillars = [
  {
    icon: Target,
    title: "Our Motive",
    description: "Standard college portfolios are no longer enough. We realized that to truly excel, we needed a crucible—an environment where passion for modern technology is forged into real, impactful products. DRACARYS bridges the massive gap between academic theory and production-grade engineering."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We don't just build toys. From AI-powered security platforms (HostelHub) to Web3 decentralized vaults (TrueVault), we tackle problems that demand architectural rigor, scalable system design, and advanced technology stacks."
  },
  {
    icon: Rocket,
    title: "Startup Mentality",
    description: "Every internal project, client request, and hackathon is treated exactly like a real-world startup. We enforce strict CI/CD pipelines, code reviews, rigorous UI/UX standards, and agile delivery cycles."
  },
  {
    icon: Shield,
    title: "The Dragon Legacy",
    description: "Code is temporary, but the architecture of a team is permanent. True leadership means writing code that others can read, building systems that scale, and creating a supportive collective where developers transcend their limits."
  }
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <Section className="relative z-10 overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold heading-dragon mb-6 leading-tight">
              Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Classroom</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              DRACARYS is a student-led technology organization built on a singular vision: 
              To forge academic potential into production-ready engineering excellence.
            </p>
          </div>

          <LiquidGlass heavy className="p-8 md:p-12 mb-20 border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">The Community Motive</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The inception of DRACARYS came from a shared frustration: academic projects rarely reflect the rigorous demands of the actual tech industry. We formed this collective to act as a bridge. 
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By bringing together the most passionate developers, designers, and architects, we created a space where members don't just learn syntax—they learn system design, production deployment, and collaborative engineering. We rise together.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Engineering Innovation</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our innovation lies in our execution. We integrate cutting-edge domains like Generative AI, Computer Vision, and Web3 into highly stable, scalable full-stack architectures. 
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We don't use templates. We build bespoke design systems. We don't manually deploy. We rely on automated pipelines and container orchestration. DRACARYS operates at the bleeding edge, ensuring every member is over-prepared for the modern technology landscape.
                </p>
              </div>

            </div>
          </LiquidGlass>

          <SectionHeader 
            title="The Four Pillars" 
            description="The core tenets that define our approach to every line of code."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{pillar.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </Container>
      </Section>
    </div>
  );
}
