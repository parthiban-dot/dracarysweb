import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { Launcher } from "@/types/launcher";

export function LauncherCard(props: Launcher) {
  return (
    <Link href={`/free-launchers/${props.slug}`} className="group block h-full">
      <LiquidGlass className="h-full p-6 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all flex flex-col relative overflow-hidden">
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-muted-foreground">
            {props.version}
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors relative z-10">{props.title}</h3>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 relative z-10">{props.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/10 pt-4 mt-auto relative z-10">
          <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">{props.license}</span>
          <span className="font-medium text-foreground">{props.technologyStack[0]}</span>
        </div>
      </LiquidGlass>
    </Link>
  );
}
