"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <Button 
      variant="outline" 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="border-white/10 hover:bg-white/5"
    >
      <LogOut className="w-4 h-4 mr-2" /> Sign Out
    </Button>
  );
}