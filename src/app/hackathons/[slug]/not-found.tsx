import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HackathonNotFound() {
  return (
    <Section className="min-h-[80vh] flex items-center">
      <Container>
        <EmptyState 
          title="Hackathon Not Found"
          description="The event you are looking for does not exist in our archives."
        />
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-white/10">
            <Link href="/hackathons">Return to Hackathons</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
