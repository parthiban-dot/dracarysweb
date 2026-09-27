import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { FileText } from "lucide-react";
import { ApplicationStatusActions } from "./application-status-actions";

const prisma = new PrismaClient();

export default async function AdminApplicationsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const applications = await prisma.joinApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <LiquidGlass className="relative overflow-hidden p-8 md:p-12 border-white/10 mb-10 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 scale-texture opacity-[0.05]" />
        <div className="absolute -top-40 right-20 w-80 h-80 bg-teal-600/20 rounded-full blur-[100px]" />
        
        <FileText className="w-12 h-12 text-primary mb-6 animate-pulse" />
        
        <h1 className="heading-dragon text-4xl md:text-5xl mb-4 text-white">
          JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-primary">APPLICATIONS</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl relative z-10">
          Review candidate portfolios, vet incoming talent, and expand the collective.
        </p>
      </LiquidGlass>

      <div className="space-y-6">
        {applications.map(app => (
          <LiquidGlass key={app.id} className="p-6 border-white/10 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {app.name}
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    app.status === 'NEW' ? 'bg-primary/10 text-primary border-primary/20' : 
                    app.status === 'UNDER_REVIEW' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    app.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {app.status}
                  </span>
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{app.email} {app.phone ? `â€¢ ${app.phone}` : ""}</p>
              </div>
              
              <ApplicationStatusActions id={app.id} currentStatus={app.status} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6 border-t border-white/5 pt-6 text-sm">
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Education</span>
                  <p className="text-white">{app.college} (Year {app.year})</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Skills & Interests</span>
                  <p className="text-white mb-1"><span className="text-primary">Skills:</span> {app.skills}</p>
                  <p className="text-white"><span className="text-primary">Interests:</span> {app.interests}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase mb-1">Links</span>
                  <p className="text-blue-400">
                    {app.github && <a href={app.github} target="_blank" className="mr-3 hover:underline">GitHub</a>}
                    {app.linkedin && <a href={app.linkedin} target="_blank" className="mr-3 hover:underline">LinkedIn</a>}
                    {app.portfolio && <a href={app.portfolio} target="_blank" className="hover:underline">Portfolio</a>}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase mb-1">Why DRACARYS?</span>
                <p className="text-white whitespace-pre-wrap bg-white/5 p-4 rounded border border-white/5">{app.reason}</p>
              </div>
            </div>
          </LiquidGlass>
        ))}
        
        {applications.length === 0 && (
          <LiquidGlass className="p-12 text-center text-muted-foreground border-white/10">
            No applications received yet.
          </LiquidGlass>
        )}
      </div>
    </div>
  );
}
