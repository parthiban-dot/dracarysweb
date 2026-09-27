"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { SubmitButton } from "@/components/ui/submit-button";
import { CheckCircle2 } from "lucide-react";

export function ProjectForm({ users }: { users: any[] }) {
  const [success, setSuccess] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    const techArray = techInput.split(",").map((t: string) => t.trim()).filter(Boolean);
    const featuresArray = featuresInput.split(",").map((f: string) => f.trim()).filter(Boolean);

    try {
      await createProject({
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        summary: formData.get("summary") as string,
        type: formData.get("type") as string,
        year: formData.get("year") as string,
        problem: formData.get("problem") as string,
        solution: formData.get("solution") as string,
        technologyStack: techArray,
        features: featuresArray,
        repositoryUrl: formData.get("repositoryUrl") as string,
        demoUrl: formData.get("demoUrl") as string,
        memberIds: selectedMembers,
      });
      setSuccess("Project created successfully!");
      e.currentTarget.reset();
      setSelectedMembers([]);
      setTechInput("");
      setFeaturesInput("");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-2 text-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Title</label>
        <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Slug (URL)</label>
        <input name="slug" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Summary</label>
        <textarea name="summary" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</label>
          <select name="type" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="AI & Security System" className="bg-slate-900">AI & Security</option>
            <option value="Web3 / Blockchain" className="bg-slate-900">Blockchain</option>
            <option value="Institutional Web Portal" className="bg-slate-900">Web Portal</option>
            <option value="AI Reliability Framework" className="bg-slate-900">Data & AI</option>
            <option value="Mobile Application" className="bg-slate-900">Mobile</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Year</label>
          <input name="year" defaultValue={new Date().getFullYear().toString()} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Problem Statement</label>
        <textarea name="problem" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solution / Architecture</label>
        <textarea name="solution" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core Features (comma separated)</label>
        <input 
          value={featuresInput}
          onChange={(e) => setFeaturesInput(e.target.value)}
          placeholder="Facial Recognition, OTP Auth, Dashboard"
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
        <input 
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React, Python, PostgreSQL"
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Repository URL</label>
          <input name="repositoryUrl" type="url" placeholder="https://github.com/..." className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Demo URL</label>
          <input name="demoUrl" type="url" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Assign Team Members</label>
        <div className="max-h-40 overflow-y-auto space-y-2 bg-white/5 border border-white/10 rounded-md p-3">
          {users.map(u => (
            <div key={u.id} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id={`user-${u.id}`}
                checked={selectedMembers.includes(u.id)}
                onChange={() => toggleMember(u.id)}
                className="rounded border-white/20 bg-black/40 text-primary focus:ring-primary/50"
              />
              <label htmlFor={`user-${u.id}`} className="text-sm text-white cursor-pointer select-none">
                {u.name} <span className="text-muted-foreground text-xs">({u.email})</span>
              </label>
            </div>
          ))}
          {users.length === 0 && <p className="text-xs text-muted-foreground">No approved members found.</p>}
        </div>
      </div>

      <SubmitButton className="w-full dragon-glow mt-4" pendingText="Creating...">
        Create Project
      </SubmitButton>
    </form>
  );
}