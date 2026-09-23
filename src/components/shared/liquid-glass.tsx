import * as React from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  heavy?: boolean
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ className, heavy = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          heavy ? "glass-panel-heavy" : "glass-panel",
          "rounded-xl overflow-hidden transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
LiquidGlass.displayName = "LiquidGlass"
