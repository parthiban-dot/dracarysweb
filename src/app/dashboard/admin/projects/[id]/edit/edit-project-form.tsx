"use client";

import { useState } from "react";
import { updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { ProjectStatus } from "@prisma/client";

export function EditProjectForm({ project, users }: { project: any, users: any[] }) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    project.teamMembers?.map((m: any) => m.userId) || []
  );

  const toggleMember = (userId: string) => {
    setSelectedMembers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    try {
      await updateProject(project.id, {
        title: formData.get("title") as string,
        summary: formData.get("summary") as string,
        type: formData.get("type") as string,
        status: formData.get("status") as ProjectStatus,
        memberIds: selectedMembers,
      });
      setSuccess("Project updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    } finally {
      setPending(false);
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
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Summary</label>
        <textarea name="summary" defaultValue={project.summary} required rows={4} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</label>
          <select name="type" defaultValue={project.type} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="WEB" className="bg-slate-900">Web App</option>
            <option value="AI" className="bg-slate-900">AI / ML</option>
            <option value="MOBILE" className="bg-slate-900">Mobile App</option>
            <option value="SYSTEMS" className="bg-slate-900">Systems</option>
            <option value="Web App" className="bg-slate-900">Web App (Legacy)</option>
            <option value="AI & Security System" className="bg-slate-900">AI & Security System (Legacy)</option>
            <option value="AI Reliability Framework" className="bg-slate-900">AI Reliability Framework (Legacy)</option>
            <option value="Web3 & Blockchain" className="bg-slate-900">Web3 & Blockchain (Legacy)</option>
            <option value="Enterprise Web App" className="bg-slate-900">Enterprise Web App (Legacy)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</label>
          <select name="status" defaultValue={project.status} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="IN_PROGRESS" className="bg-slate-900">In Progress</option>
            <option value="COMPLETED" className="bg-slate-900">Completed</option>
            <option value="INTERNAL" className="bg-slate-900">Internal</option>
            <option value="OPEN_SOURCE" className="bg-slate-900">Open Source</option>
          </select>
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
          {users.length === 0 && (
            <p className="text-xs text-muted-foreground">No approved members found.</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full dragon-glow font-bold" disabled={pending}>
        {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
      </Button>
    </form>
  );
}