import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <Section className="min-h-[80vh] flex items-center">
      <Container>
        <EmptyState 
          title="Project Not Found"
          description="The project you are looking for does not exist or you do not have permission to view it."
        />
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-white/10">
            <Link href="/projects">Return to Projects</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
