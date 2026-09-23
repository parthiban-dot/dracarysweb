"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
  trigger: React.ReactNode;
}

export function ConfirmDialog({ title, description, onConfirm, trigger }: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    setIsPending(true);
    try {
      await onConfirm();
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-white/10 p-6 rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
              
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 bg-destructive/20 text-destructive rounded-full">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{title}</h2>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirm} disabled={isPending}>
                  {isPending ? "Processing..." : "Confirm Action"}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
