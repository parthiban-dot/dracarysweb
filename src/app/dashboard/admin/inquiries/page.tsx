import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Briefcase } from "lucide-react";
import { InquiryStatusActions } from "./inquiry-status-actions";

const prisma = new PrismaClient();

export default async function AdminInquiriesPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const inquiries = await prisma.projectInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" /> Customer Inquiries
          </h1>
          <p className="text-muted-foreground text-lg">Manage incoming project requests.</p>
        </div>
      </div>

      <div className="space-y-6">
        {inquiries.map(inq => (
          <LiquidGlass key={inq.id} className="p-6 border-white/10 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {inq.name} {inq.company && <span className="text-muted-foreground text-sm font-normal">({inq.company})</span>}
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    inq.status === 'NEW' ? 'bg-primary/10 text-primary border-primary/20' : 
                    inq.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    inq.status === 'REJECTED' || inq.status === 'ARCHIVED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {inq.status}
                  </span>
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{inq.email} {inq.phone ? `• ${inq.phone}` : ""}</p>
              </div>
              
              <InquiryStatusActions id={inq.id} currentStatus={inq.status} adminNotes={inq.adminNotes || ""} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6 border-t border-white/5 pt-6 text-sm">
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Project Need</span>
                  <p className="text-white"><span className="text-primary font-semibold">{inq.projectType}</span> - {inq.description}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Logistics</span>
                  <p className="text-white"><span className="text-primary font-semibold">Timeline:</span> {inq.timeline}</p>
                  <p className="text-white"><span className="text-primary font-semibold">Budget:</span> {inq.budget || "Not specified"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">The Problem</span>
                  <p className="text-white whitespace-pre-wrap">{inq.problem}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Features & Users</span>
                  <p className="text-white mb-1"><span className="text-primary font-semibold">Target Users:</span> {inq.targetUsers}</p>
                  <p className="text-white whitespace-pre-wrap">{inq.features}</p>
                </div>
              </div>
            </div>
          </LiquidGlass>
        ))}
        
        {inquiries.length === 0 && (
          <LiquidGlass className="p-12 text-center text-muted-foreground border-white/10">
            No inquiries received yet.
          </LiquidGlass>
        )}
      </div>
    </div>
  );
}
