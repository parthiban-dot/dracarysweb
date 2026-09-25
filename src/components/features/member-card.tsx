import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/shared/icons";
import Link from "next/link";

interface MemberCardProps {
  name: string;
  tag: string;
  role: string;
  skills: string[];
  year?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
}

export function MemberCard({ name, tag, role, skills, year, github, linkedin, instagram }: MemberCardProps) {
  return (
    <LiquidGlass className="p-6 text-center group hover:border-primary/30 transition-all flex flex-col h-full relative">
      {year && (
        <Badge variant="secondary" className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border-white/10 text-[10px]">
          {year}
        </Badge>
      )}
      
      {/* Avatar placeholder */}
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 border-2 border-white/10 mb-4 mt-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground/50">
          {name.charAt(0)}
        </div>
      </div>
      
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-primary text-sm font-bold tracking-wider uppercase mb-1">{tag}</p>
      <p className="text-muted-foreground text-sm mb-6 flex-1">{role}</p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {skills.slice(0, 3).map(skill => (
          <Badge key={skill} variant="outline" className="border-white/10 bg-white/5 text-[10px]">
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/5 mt-auto">
        {github && (
          <Link href={github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <GithubIcon className="w-4 h-4" />
          </Link>
        )}
        {linkedin && (
          <Link href={linkedin} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors">
            <LinkedinIcon className="w-4 h-4" />
          </Link>
        )}
        {instagram && (
          <Link href={instagram} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-muted-foreground transition-colors">
            <InstagramIcon className="w-4 h-4" />
          </Link>
        )}
      </div>
    </LiquidGlass>
  );
}
