"use client";

import { useState } from "react";
import { createHackathon } from "@/actions/hackathons";
import { SubmitButton } from "@/components/ui/submit-button";
import { CheckCircle2 } from "lucide-react";

export function HackathonForm({ users }: { users: any[] }) {
  const [success, setSuccess] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

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

    try {
      await createHackathon({
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        organizer: formData.get("organizer") as string,
        date: formData.get("date") as string,
        year: formData.get("year") as string,
        location: formData.get("location") as string,
        eventType: formData.get("eventType") as string,
        result: formData.get("result") as string,
        problem: formData.get("problem") as string,
        solution: formData.get("solution") as string,
        architecture: formData.get("architecture") as string,
        technologies: techArray,
        memberIds: selectedMembers,
      });
      setSuccess("Hackathon created successfully!");
      e.currentTarget.reset();
      setSelectedMembers([]);
      setTechInput("");
    } catch (err) {
      console.error(err);
      alert("Failed to create hackathon");
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
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Hackathon Name</label>
        <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Slug (URL)</label>
        <input name="slug" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Organizer</label>
          <input name="organizer" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Location</label>
          <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Date (e.g. April 2026)</label>
          <input name="date" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Year</label>
          <input name="year" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Event Type</label>
          <select name="eventType" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="In-Person" className="bg-slate-900">In-Person</option>
            <option value="Online" className="bg-slate-900">Online</option>
            <option value="Hybrid" className="bg-slate-900">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Result</label>
          <select name="result" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="PARTICIPANT" className="bg-slate-900">Participant</option>
            <option value="WINNER" className="bg-slate-900">Winner</option>
            <option value="FINALIST" className="bg-slate-900">Finalist</option>
            <option value="SPECIAL_RECOGNITION" className="bg-slate-900">Special Recognition</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Problem Statement</label>
        <textarea name="problem" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solution</label>
        <textarea name="solution" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Architecture</label>
        <textarea name="architecture" required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
        <input 
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React, Next.js, Tailwind"
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
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
        Create Hackathon
      </SubmitButton>
    </form>
  );
}