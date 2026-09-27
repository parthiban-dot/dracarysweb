import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <LiquidGlass className="w-full max-w-md p-12 relative z-10 border-primary/20 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
          Establishing Secure Connection...
        </p>
      </LiquidGlass>
    </div>
  );
}