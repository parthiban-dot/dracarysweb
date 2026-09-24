"use client";

import { useState } from "react";
import { submitProjectInquiry } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function HireForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const res = await submitProjectInquiry(data);
    
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
        <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out to DRACARYS. Our team has received your project inquiry and will contact you shortly to discuss next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Customer Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Name</label>
            <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Company / Organization (Optional)</label>
            <input name="company" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
            <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Phone / WhatsApp (Optional)</label>
            <input name="phone" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">Project Details</h3>
        
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Type</label>
          <select name="projectType" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50">
            <option value="WEB" className="bg-slate-900">Web Application</option>
            <option value="MOBILE" className="bg-slate-900">Mobile Application</option>
            <option value="AI" className="bg-slate-900">AI / ML Solution</option>
            <option value="API" className="bg-slate-900">API / Backend</option>
            <option value="OTHER" className="bg-slate-900">Other Custom Software</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Short Description</label>
          <textarea name="description" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">What problem are you trying to solve?</label>
          <textarea name="problem" required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Features</label>
          <textarea name="features" required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Target Users</label>
          <input name="targetUsers" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Expected Timeline</label>
            <input name="timeline" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Estimated Budget (Optional)</label>
            <input name="budget" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:border-primary/50" />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full dragon-glow" size="lg">
        {pending ? "Submitting..." : "SUBMIT PROJECT INQUIRY"}
      </Button>
    </form>
  );
}
