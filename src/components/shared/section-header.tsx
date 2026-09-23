import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({ title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-12", {
      "text-left": align === "left",
      "text-center flex flex-col items-center": align === "center",
      "text-right": align === "right",
    }, className)}>
      <h2 className={cn("text-3xl md:text-5xl heading-dragon", {
        "claw-border pl-4": align === "left"
      })}>
        {title}
      </h2>
      {description && (
        <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
