"use client";

import { updateJoinApplicationStatus } from "@/actions/admin";

export function ApplicationStatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  
  async function handleUpdate(status: string) {
    await updateJoinApplicationStatus(id, status);
  }

  return (
    <select 
      className="bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-8"
      value={currentStatus}
      onChange={(e) => handleUpdate(e.target.value)}
    >
      <option value="NEW" className="bg-slate-900">New</option>
      <option value="UNDER_REVIEW" className="bg-slate-900">Under Review</option>
      <option value="ACCEPTED" className="bg-slate-900">Accepted</option>
      <option value="REJECTED" className="bg-slate-900">Rejected</option>
    </select>
  );
}
