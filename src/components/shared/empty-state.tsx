import { LiquidGlass } from "./liquid-glass";
import { Search } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <LiquidGlass className="flex flex-col items-center justify-center p-12 text-center border-dashed border-white/10 bg-transparent shadow-none">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-muted-foreground">
        {icon || <Search className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action}
    </LiquidGlass>
  );
}
