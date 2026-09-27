"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  pendingText?: string;
}

export function SubmitButton({ children, pendingText, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending || props.disabled} 
      className={cn("relative transition-all", className)}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {pendingText || children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export function ActionIconButton({ children, className, title, pendingText }: { children: React.ReactNode, className?: string, title?: string, pendingText?: string }) {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending} className={cn("transition-all flex items-center justify-center disabled:opacity-50", className)} title={title}>
      {pending ? (
        <span className="flex items-center gap-1">
          <Loader2 className="w-4 h-4 animate-spin" />
          {pendingText && <span className="text-xs">{pendingText}</span>}
        </span>
      ) : children}
    </button>
  );
}