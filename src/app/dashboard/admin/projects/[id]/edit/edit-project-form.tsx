"use client";

import { useState } from "react";
import { updateProject } from "@/actions/projects";
import { SubmitButton } from "@/components/ui/submit-button";
import { CheckCircle2 } from "lucide-react";
import { ProjectStatus } from "@prisma/client";

export function EditProjectForm({ project, users }: { project: any, users: any[] }) {
  const [success, setSuccess] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    project.teamMembers?.map((m: any) => m.userId) || []
  );
  const [techInput, setTechInput] = useState(project.technologyStack?.join(", ") || "");
  const [featuresInput, setFeaturesInput] = useState(project.features?.join(", ") || "");

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
      await updateProject(project.id, {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        summary: formData.get("summary") as string,
        type: formData.get("type") as string,
        status: formData.get("status") as ProjectStatus,
        year: formData.get("year") as string,
        problem: formData.get("problem") as string,
        solution: formData.get("solution") as string,
        technologyStack: techArray,
        features: featuresArray,
        repositoryUrl: formData.get("repositoryUrl") as string,
        demoUrl: formData.get("demoUrl") as string,
        memberIds: selectedMembers,
      });
      setSuccess("Project updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-2 text-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Title</label>
        <input name="title" defaultValue={project.title} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Slug (URL)</label>
        <input name="slug" defaultValue={project.slug} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Summary</label>
        <textarea name="summary" defaultValue={project.summary} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</label>
          <select name="type" defaultValue={project.type} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="AI & Security System" className="bg-slate-900">AI & Security</option>
            <option value="Web3 / Blockchain" className="bg-slate-900">Blockchain</option>
            <option value="Institutional Web Portal" className="bg-slate-900">Web Portal</option>
            <option value="AI Reliability Framework" className="bg-slate-900">Data & AI</option>
            <option value="Mobile Application" className="bg-slate-900">Mobile</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</label>
          <select name="status" defaultValue={project.status} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="COMPLETED" className="bg-slate-900">Completed</option>
            <option value="IN_PROGRESS" className="bg-slate-900">In Progress</option>
            <option value="MAINTENANCE" className="bg-slate-900">Maintenance</option>
            <option value="OPEN_SOURCE" className="bg-slate-900">Open Source</option>
            <option value="ARCHIVED" className="bg-slate-900">Archived</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Year</label>
        <input name="year" defaultValue={project.year} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Problem Statement</label>
        <textarea name="problem" defaultValue={project.problem} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solution / Architecture</label>
        <textarea name="solution" defaultValue={project.solution} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Core Features (comma separated)</label>
        <input 
          value={featuresInput}
          onChange={(e) => setFeaturesInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
        <input 
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Repository URL</label>
          <input name="repositoryUrl" type="url" defaultValue={project.repositoryUrl || ""} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Demo URL</label>
          <input name="demoUrl" type="url" defaultValue={project.demoUrl || ""} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Assign Team Members</label>
        <div className="max-h-60 overflow-y-auto space-y-2 bg-white/5 border border-white/10 rounded-md p-3">
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

      <SubmitButton className="w-full dragon-glow mt-4" pendingText="Saving...">
        Save Changes
      </SubmitButton>
    </form>
  );
}