import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Rocket, Target, Shield, Zap, Camera } from "lucide-react";
import { Metadata } from "next";
import { AboutHero3D } from "@/components/features/about-hero-3d";

export const metadata: Metadata = {
  title: "About DRACARYS | Our Journey & Motive",
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

          {/* TIMELINE SECTION */}
          <div className="mt-32">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">DRACARYS Journey</h2>
              <p className="text-white/60 max-w-2xl">
                Our evolution from a small group of ambitious students to an active engineering team.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto relative border-l-2 border-white/10 pl-8 pb-4 space-y-12">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-secondary" />
                <h4 className="text-xl font-bold text-white">DRACARYS Founded</h4>
                <p className="text-sm font-bold text-secondary mb-2">Early 2026</p>
                <p className="text-muted-foreground">The vision was simple: stop building tutorial projects and start solving real problems.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-primary" />
                <h4 className="text-xl font-bold text-white">First Major Project: HostelHub</h4>
                <p className="text-sm font-bold text-primary mb-2">Mid 2026</p>
                <p className="text-muted-foreground">Designed and built an AI-powered facial recognition platform to replace legacy attendance ledgers.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-amber-500" />
                <h4 className="text-xl font-bold text-white">Hackathon Entry: YHACK '26</h4>
                <p className="text-sm font-bold text-amber-500 mb-2">Late 2026</p>
                <p className="text-muted-foreground">Entered the competitive stage with TrueVault, learning how to pitch, present, and survive 24-hour dev cycles.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-emerald-500" />
                <h4 className="text-xl font-bold text-white">First Achievement</h4>
                <p className="text-sm font-bold text-emerald-500 mb-2">Late 2026</p>
                <p className="text-muted-foreground">Recognized as finalists, cementing our belief that our engineering could stand against the best.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-blue-400" />
                <h4 className="text-xl font-bold text-white">Scaling the Vision</h4>
                <p className="text-sm font-bold text-blue-400 mb-2">Present</p>
                <p className="text-muted-foreground">Continuing to ship products, experiment with LLMs, and forge the future.</p>
              </div>
            </div>
          </div>

          {/* REAL HUMAN SECTION */}
          <div className="mt-32 pb-16">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">Behind The Code</h2>
              <p className="text-white/60 max-w-2xl italic font-medium">
                "The code is only half the story."
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto border border-white/10 bg-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] border-dashed">
              <Camera className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-muted-foreground max-w-lg mb-6">
                (This space is reserved for real team photography. We believe in authenticity over stock images. Real photos of our hackathon trips and late-night coding sessions go here.)
              </p>
            </div>
          </div>

        </Container>
      </Section>
    </div>
  );
}
