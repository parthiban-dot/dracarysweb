"use client";

import { updateProjectInquiryStatus } from "@/actions/admin";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function InquiryStatusActions({ id, currentStatus, adminNotes }: { id: string, currentStatus: string, adminNotes: string }) {
  const [notes, setNotes] = useState(adminNotes);
  const [isSaving, setIsSaving] = useState(false);
  
  async function handleUpdate(status: string) {
    await updateProjectInquiryStatus(id, status, notes);
  }

  async function handleSaveNotes() {
    setIsSaving(true);
    await updateProjectInquiryStatus(id, currentStatus, notes);
    setIsSaving(false);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <select 
        className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-8"
        value={currentStatus}
        onChange={(e) => handleUpdate(e.target.value)}
      >
        <option value="NEW" className="bg-slate-900">New</option>
        <option value="CONTACTED" className="bg-slate-900">Contacted</option>
        <option value="DISCUSSION" className="bg-slate-900">Discussion</option>
        <option value="PROPOSAL" className="bg-slate-900">Proposal</option>
        <option value="IN_PROGRESS" className="bg-slate-900">In Progress</option>
        <option value="COMPLETED" className="bg-slate-900">Completed</option>
        <option value="REJECTED" className="bg-slate-900">Rejected</option>
        <option value="ARCHIVED" className="bg-slate-900">Archived</option>
      </select>

      <div className="mt-2 text-right">
        <textarea 
          placeholder="Internal admin notes..."
          className="w-48 h-20 bg-black/40 border border-white/10 rounded-md p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary mb-1"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button onClick={handleSaveNotes} disabled={isSaving} size="sm" variant="outline" className="w-full text-xs h-6 px-2">
          {isSaving ? "Saving..." : "Save Notes"}
        </Button>
      </div>
    </div>
  );
}
