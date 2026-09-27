import { Container } from "@/components/layout/container";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <LiquidGlass className="p-8 rounded-full border-white/10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </LiquidGlass>
      <p className="text-muted-foreground text-sm font-medium mt-6 uppercase tracking-widest animate-pulse">
        Accessing Secure Uplink...
      </p>
    </div>
  );
}