"use strict";
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="glass-panel p-8 rounded-lg max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Our team has been notified.
        </p>
        <Button
          onClick={() => reset()}
          variant="outline"
          className="border-white/20 hover:bg-white/10"
        >
          Try again
        </Button>
      </div>
    </Container>
  );
}
