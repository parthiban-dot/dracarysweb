"use client";

import { useState } from "react";
import { updateHackathon } from "@/actions/hackathons";
import { SubmitButton } from "@/components/ui/submit-button";
import { CheckCircle2 } from "lucide-react";

export function EditHackathonForm({ hackathon, users }: { hackathon: any, users: any[] }) {
  const [success, setSuccess] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    hackathon.teamMembers?.map((m: any) => m.userId) || []
  );
  const [techInput, setTechInput] = useState(hackathon.technologies?.join(", ") || "");

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
      await updateHackathon(hackathon.id, {
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
      setSuccess("Hackathon updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update hackathon");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-2 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Hackathon Name</label>
        <input name="name" defaultValue={hackathon.name} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Slug (URL)</label>
        <input name="slug" defaultValue={hackathon.slug} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Organizer</label>
          <input name="organizer" defaultValue={hackathon.organizer} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Location</label>
          <input name="location" defaultValue={hackathon.location} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Date</label>
          <input name="date" defaultValue={hackathon.date} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Year</label>
          <input name="year" defaultValue={hackathon.year} required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Event Type</label>
          <select name="eventType" defaultValue={hackathon.eventType} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="In-Person" className="bg-slate-900">In-Person</option>
            <option value="Online" className="bg-slate-900">Online</option>
            <option value="Hybrid" className="bg-slate-900">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Result</label>
          <select name="result" defaultValue={hackathon.result} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
            <option value="PARTICIPANT" className="bg-slate-900">Participant</option>
            <option value="WINNER" className="bg-slate-900">Winner</option>
            <option value="FINALIST" className="bg-slate-900">Finalist</option>
            <option value="SPECIAL_RECOGNITION" className="bg-slate-900">Special Recognition</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Problem Statement</label>
        <textarea name="problem" defaultValue={hackathon.problem} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Solution</label>
        <textarea name="solution" defaultValue={hackathon.solution} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Architecture</label>
        <textarea name="architecture" defaultValue={hackathon.architecture} required rows={2} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack (comma separated)</label>
        <input 
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" 
        />
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