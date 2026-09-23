import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LauncherNotFound() {
  return (
    <Section className="min-h-[80vh] flex items-center">
      <Container>
        <EmptyState 
          title="Release Not Found"
          description="The tool or starter kit you are looking for does not exist."
        />
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-white/10">
            <Link href="/free-launchers">Browse All Releases</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
