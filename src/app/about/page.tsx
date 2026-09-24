
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Rocket, Target, Shield, Zap } from "lucide-react";
import { Metadata } from "next";
import { AboutHero3D } from "@/components/features/about-hero-3d";

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
    <div className="pt-24 pb-16 overflow-hidden">
      <Section className="relative z-10">
        
        <Container>
          
          <AboutHero3D />

          <div className="mt-24">
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
          </div>

        </Container>
      </Section>
    </div>
  );
}
