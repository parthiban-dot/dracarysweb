import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Metadata } from "next";
import { JoinForm } from "./join-form";

export const metadata: Metadata = {
  title: "Join DRACARYS",
  description: "Apply to join the DRACARYS student engineering team.",
};

export default function JoinPage() {
  return (
    <div className="pt-24 pb-16 overflow-hidden">
      <Section className="relative z-10">
        <Container>
          <SectionHeader 
            title="Join DRACARYS" 
            description="We're looking for people who are willing to learn, build, experiment and show up. Submitting this application does not automatically make you a member. Our team will review your application and reach out."
          />

          <div className="max-w-3xl mx-auto mt-12">
            <LiquidGlass className="p-8">
              <JoinForm />
            </LiquidGlass>
          </div>
        </Container>
      </Section>
    </div>
  );
}
