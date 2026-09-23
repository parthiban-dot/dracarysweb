import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { demoHackathons } from "@/lib/demo-data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Code2, MapPin, Calendar, Lightbulb, Trophy, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/shared/icons";
import { Metadata } from "next";

interface HackathonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HackathonPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const hackathon = demoHackathons.find((h) => h.slug === resolvedParams.slug);
  
  if (!hackathon) {
    return { title: "Hackathon Not Found | DRACARYS" };
  }

  return {
    title: `${hackathon.name} - ${hackathon.award} | DRACARYS`,
    description: `Read about our technical solution and architecture for the ${hackathon.name} hackathon.`,
  };
}

// Generate static params for demo data
export function generateStaticParams() {
  return demoHackathons.map((hackathon) => ({
    slug: hackathon.slug,
  }));
}

export default async function HackathonDetailPage({ params }: HackathonPageProps) {
  const resolvedParams = await params;
  const hackathon = demoHackathons.find((h) => h.slug === resolvedParams.slug);

  if (!hackathon) {
    notFound();
  }

  return (
    <>
      <Section className="pt-24 pb-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary/10 via-background to-background pointer-events-none" />
        <Container className="relative z-10">
          <Link href="/hackathons" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to hackathons
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/20 hover:bg-secondary/30">
              <Trophy className="w-3 h-3 mr-1" /> {hackathon.result.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className="border-white/10">
              {hackathon.eventType}
            </Badge>
          </div>

          <p className="text-secondary font-bold tracking-widest uppercase mb-2">
            {hackathon.organizer}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold heading-dragon mb-6 max-w-4xl">
            {hackathon.name}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {hackathon.date}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {hackathon.location}</span>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
                Demo Content
              </div>

              {/* Problem & Solution */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-red-400" /> The Problem</h3>
                  <LiquidGlass className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{hackathon.problem}</p>
                  </LiquidGlass>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-secondary" /> Our Solution</h3>
                  <LiquidGlass className="p-6 border-l-4 border-l-secondary/50">
                    <p className="text-muted-foreground leading-relaxed">{hackathon.solution}</p>
                  </LiquidGlass>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Code2 className="w-5 h-5 text-primary" /> Architecture</h3>
                  <LiquidGlass className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{hackathon.architecture}</p>
                  </LiquidGlass>
                </div>
              </div>

              {/* Lessons Learned */}
              <LiquidGlass heavy className="p-8 border-secondary/20 dragon-eye">
                <h3 className="text-2xl font-bold mb-6">Lessons Learned</h3>
                <ul className="space-y-4">
                  {hackathon.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground/90 font-medium">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </LiquidGlass>

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              
              {/* Award */}
              <LiquidGlass className="p-6 bg-secondary/5 border-secondary/20">
                <h3 className="font-bold mb-4 claw-border pl-3 border-secondary text-secondary">The Result</h3>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/20 text-secondary shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-lg">{hackathon.award}</p>
                </div>
              </LiquidGlass>

              {/* Tech Stack */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-white/5 border-white/10 text-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </LiquidGlass>

              {/* Team */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Hackers</h3>
                <ul className="space-y-3">
                  {hackathon.teamMembers.map((member, i) => (
                    <li key={i} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-[10px] text-secondary font-bold">
                        {member.charAt(0)}
                      </div>
                      {member}
                    </li>
                  ))}
                </ul>
              </LiquidGlass>

              {/* Links */}
              <LiquidGlass className="p-6">
                <h3 className="font-bold mb-4 claw-border pl-3">Resources</h3>
                <div className="space-y-3 flex flex-col">
                  {hackathon.demoUrl && (
                    <Button asChild className="w-full dragon-glow dragon-glow-violet bg-secondary hover:bg-secondary/90 text-white">
                      <Link href={hackathon.demoUrl} target="_blank">View Live Demo</Link>
                    </Button>
                  )}
                  
                  {hackathon.repositoryUrl && (
                    <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5 text-foreground">
                      <Link href={hackathon.repositoryUrl} target="_blank"><GithubIcon className="w-4 h-4 mr-2" /> Source Code</Link>
                    </Button>
                  )}
                </div>
              </LiquidGlass>

            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
