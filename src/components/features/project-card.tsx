import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  summary: string;
  slug: string;
  technologyStack: string[];
  status: string;
}

export function ProjectCard({ title, summary, slug, technologyStack, status }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block h-full">
      <LiquidGlass className="h-full p-0 flex flex-col dragon-eye transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
        {/* Abstract image placeholder using CSS gradient instead of missing image */}
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
          <div className="absolute inset-0 scale-texture opacity-20" />
          <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border-white/10">
            {status}
          </Badge>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-6 flex-1 text-sm line-clamp-3">
            {summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {technologyStack.slice(0, 3).map(tech => (
              <Badge key={tech} variant="outline" className="border-white/10 text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center text-sm font-medium text-primary mt-auto">
            View Project <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </LiquidGlass>
    </Link>
  );
}
