"use client";

import { useState } from "react";
import { createAnnouncement } from "@/actions/announcements";
import { Button } from "@/components/ui/button";

export function AnnouncementForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createAnnouncement({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        priority: formData.get("priority") as string,
        isPublished: formData.get("isPublished") === "true",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Failed to create announcement");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Title</label>
        <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Content</label>
        <textarea name="content" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Priority</label>
        <select name="priority" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
          <option value="NORMAL" className="bg-slate-900">Normal</option>
          <option value="IMPORTANT" className="bg-slate-900">Important</option>
          <option value="URGENT" className="bg-slate-900 text-red-400">Urgent</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</label>
        <select name="isPublished" className="w-full bg-white/5 border border-white/10 rounded-md p-2.5 text-white text-sm focus:outline-none focus:border-primary/50">
          <option value="true" className="bg-slate-900">Publish Immediately</option>
          <option value="false" className="bg-slate-900">Save as Draft</option>
        </select>
      </div>
      <Button type="submit" disabled={pending} className="w-full dragon-glow">
        {pending ? "Creating..." : "Create Announcement"}
      </Button>
    </form>
  );
}
