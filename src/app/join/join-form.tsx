"use client";

import { useState } from "react";
import { submitJoinApplication } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function JoinForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const res = await submitJoinApplication(data);
    
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || "An error occurred.");
    }
    setPending(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
        <h3 className="text-2xl font-bold text-white">Application Received</h3>
        <p className="text-muted-foreground">
          Thank you for applying to DRACARYS. Our admin team will review your details and reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Full Name</label>
            <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
            <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Phone Number (Optional)</label>
            <input name="phone" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">College / Institution</label>
            <input name="college" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Year of Study</label>
            <input name="year" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Technical Information</h3>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills (Comma separated)</label>
          <input name="skills" required placeholder="React, Python, Figma..." className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Areas of Interest</label>
          <input name="interests" required placeholder="Frontend, Backend, AI..." className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">GitHub URL</label>
            <input name="github" type="url" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">LinkedIn URL</label>
            <input name="linkedin" type="url" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Portfolio URL (Optional)</label>
            <input name="portfolio" type="url" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">DRACARYS Questions</h3>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Why do you want to join DRACARYS?</label>
          <textarea name="reason" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full dragon-glow" size="lg">
        {pending ? "Submitting..." : "SUBMIT APPLICATION"}
      </Button>
    </form>
  );
}
