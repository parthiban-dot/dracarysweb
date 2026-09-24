import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Metadata } from "next";
import { HireForm } from "./hire-form";

export const metadata: Metadata = {
  title: "Hire DRACARYS",
  description: "Submit a project inquiry for DRACARYS to build your next product.",
};

export default function HirePage() {
  return (
    <div className="pt-24 pb-16 overflow-hidden">
      <Section className="relative z-10">
        <Container>
          <SectionHeader 
            title="Work With Us" 
            description="Have a problem that needs solving? Tell us what you want to build. Our engineering team will review your requirements and get back to you with a proposal."
          />

          <div className="max-w-3xl mx-auto mt-12">
            <LiquidGlass className="p-8">
              <HireForm />
            </LiquidGlass>
          </div>
        </Container>
      </Section>
    </div>
  );
}
