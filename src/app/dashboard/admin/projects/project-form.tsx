"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";

export function ProjectForm({ users }: { users: any[] }) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createProject({
        title: formData.get("title") as string,
        summary: formData.get("summary") as string,
        type: formData.get("type") as string,
        year: new Date().getFullYear().toString(),
        problem: formData.get("problem") as string || "TBD",
        solution: formData.get("solution") as string || "TBD",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Title</label>
        <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Summary</label>
        <textarea name="summary" required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</label>
        <select name="type" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
          <option value="WEB" className="bg-slate-900">Web App</option>
          <option value="AI" className="bg-slate-900">AI / ML</option>
          <option value="MOBILE" className="bg-slate-900">Mobile App</option>
          <option value="SYSTEMS" className="bg-slate-900">Systems</option>
        </select>
      </div>
      <Button type="submit" disabled={pending} className="w-full dragon-glow">
        {pending ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
