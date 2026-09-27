import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Layout, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/shared/icons";
import { db as prisma } from "@/lib/db";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 30; // Edge cache for performance

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<import("next").Metadata> {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | DRACARYS`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: project.coverImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.coverImage || "/og-image.jpg"],
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      teamMembers: {
        include: { user: true }
      }
    }
  });

  if (!project) {
    notFound();
  }

  const isPrivate = project.clientVisibility === "PRIVATE";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="pt-24 pb-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10">
          <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to projects
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
              {project.status.replace(/_/g, ' ')}
            </Badge>
            <Badge variant="outline" className="border-white/10">
              {project.type.replace(/_/g, ' ')}
            </Badge>
            <Badge variant="outline" className="border-white/10">
              {project.year}
            </Badge>
            {isPrivate && (
              <Badge variant="destructive" className="bg-red-500/20 text-red-500 border-red-500/20">
                <ShieldAlert className="w-3 h-3 mr-1" /> Confidential
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold heading-dragon mb-6 max-w-4xl">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {project.summary}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Problem & Solution */}
              <div className="space-y-8">
                <LiquidGlass className="p-8 border-l-4 border-l-red-500/50">
                  <h3 className="text-xl font-bold mb-4 text-red-400">The Problem</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.problem}</p>
                </LiquidGlass>

                <LiquidGlass className="p-8 border-l-4 border-l-primary/50">
                  <h3 className="text-xl font-bold mb-4 text-primary">The Solution</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                </LiquidGlass>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Layout className="w-6 h-6 text-primary" /> Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <LiquidGlass key={idx} className="p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </LiquidGlass>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              {project.outcome && (
                <LiquidGlass heavy className="p-8 dragon-eye">
                  <h3 className="text-2xl font-bold mb-4">Outcome & Impact</h3>
                  <p className="text-lg text-foreground/90 leading-relaxed font-medium whitespace-pre-wrap">
                    {project.outcome}
                  </p>
                </LiquidGlass>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              
              {/* Tech Stack */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologyStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 border-white/10 text-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </LiquidGlass>

              {/* Team */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Team</h3>
                <ul className="space-y-3">
                  {project.teamMembers.length > 0 ? project.teamMembers.map((member, i) => (
                    <li key={i} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                        {member.user.name?.charAt(0) || "U"}
                      </div>
                      {member.user.name || "Unknown Member"}
                      <span className="text-[10px] uppercase text-primary/70 ml-auto">{member.role}</span>
                    </li>
                  )) : (
                    <li className="text-muted-foreground text-sm italic">No assigned members</li>
                  )}
                </ul>
              </LiquidGlass>

              {/* Links */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Links</h3>
                <div className="space-y-3 flex flex-col">
                  {project.demoUrl ? (
                    <Button asChild className="w-full dragon-glow">
                      <Link href={project.demoUrl} target="_blank">View Live Demo</Link>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="w-full opacity-50">Demo Unavailable</Button>
                  )}
                  
                  {project.repositoryUrl && !isPrivate ? (
                    <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5 text-foreground">
                      <Link href={project.repositoryUrl} target="_blank"><GithubIcon className="w-4 h-4 mr-2" /> Source Code</Link>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="w-full opacity-50"><GithubIcon className="w-4 h-4 mr-2" /> Private Repository</Button>
                  )}
                </div>
              </LiquidGlass>

            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}