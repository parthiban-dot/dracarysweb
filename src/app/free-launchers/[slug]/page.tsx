import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { demoLaunchers } from "@/lib/demo-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Terminal, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/shared/icons";
import { Metadata } from "next";

interface LauncherPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LauncherPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const launcher = demoLaunchers.find((l) => l.slug === resolvedParams.slug);
  
  if (!launcher) {
    return { title: "Release Not Found | DRACARYS" };
  }

  return {
    title: `${launcher.title} ${launcher.version} | DRACARYS Open Source`,
    description: launcher.description,
  };
}

export function generateStaticParams() {
  return demoLaunchers.map((launcher) => ({
    slug: launcher.slug,
  }));
}

export default async function LauncherDetailPage({ params }: LauncherPageProps) {
  const resolvedParams = await params;
  const launcher = demoLaunchers.find((l) => l.slug === resolvedParams.slug);

  if (!launcher) {
    notFound();
  }

  return (
    <>
      <Section className="pt-24 pb-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10">
          <Link href="/free-launchers" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to releases
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Code2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary" className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/20 font-mono">
                  {launcher.version}
                </Badge>
                <Badge variant="outline" className="border-white/10 font-mono">
                  {launcher.license} License
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold heading-dragon">
                {launcher.title}
              </h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mt-6">
            {launcher.description}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
                Demo Environment
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-accent" /> Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {launcher.features.map((feature, idx) => (
                    <LiquidGlass key={idx} className="p-4 flex items-start gap-3 border-l-2 border-l-accent/50">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground/90">{feature}</span>
                    </LiquidGlass>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3 border-accent">Installation & Links</h3>
                <div className="space-y-3 flex flex-col">
                  {launcher.repositoryUrl ? (
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white dragon-glow">
                      <Link href={launcher.repositoryUrl} target="_blank"><GithubIcon className="w-4 h-4 mr-2" /> View Repository</Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-accent/50 text-white opacity-50">Private Repository</Button>
                  )}
                  
                  {launcher.releaseUrl && (
                    <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5 text-foreground">
                      <Link href={launcher.releaseUrl} target="_blank"><ExternalLink className="w-4 h-4 mr-2" /> Live Demo / Docs</Link>
                    </Button>
                  )}
                </div>
              </LiquidGlass>

              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Release Details</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground mb-1">Maintainer</dt>
                    <dd className="font-medium">{launcher.maintainer}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Release Date</dt>
                    <dd className="font-medium font-mono">{launcher.releaseDate}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Category</dt>
                    <dd className="font-medium">{launcher.category.replace("_", " ")}</dd>
                  </div>
                </dl>
              </LiquidGlass>

              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {launcher.technologyStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 border-white/10 text-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </LiquidGlass>

            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
