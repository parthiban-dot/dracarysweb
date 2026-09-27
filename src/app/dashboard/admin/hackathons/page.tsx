import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { HackathonForm } from "./hackathon-form";

const prisma = new PrismaClient();

export default async function AdminHackathonsPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const dbHackathons = await prisma.hackathon.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teamMembers: {
        include: { user: true }
      }
    }
  });
  
  const hackathons: any[] = JSON.parse(JSON.stringify(dbHackathons));

  const dbUsers = await prisma.user.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" }
  });

  const allUsers = JSON.parse(JSON.stringify(dbUsers));

  return (
    <div className="space-y-8">
      <LiquidGlass className="relative overflow-hidden p-8 md:p-12 border-white/10 mb-10 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 scale-texture opacity-[0.05]" />
        <div className="absolute top-0 right-20 w-80 h-80 bg-yellow-600/20 rounded-full blur-[100px]" />
        
        <Trophy className="w-12 h-12 text-primary mb-6 animate-pulse" />
        
        <h1 className="heading-dragon text-4xl md:text-5xl mb-4 text-white">
          MANAGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-primary">HACKATHONS</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl relative z-10">
          Create, edit, and assign team members to competitive hackathon builds.
        </p>
      </LiquidGlass>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {hackathons.map(hack => (
            <LiquidGlass key={hack.id} className="p-6 border-white/10 relative group">
              <div className="flex flex-col">
                <div className="flex items-start justify-between w-full mb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                    {hack.name}
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                      {hack.result}
                    </span>
                  </h3>
                  <Link href={`/dashboard/admin/hackathons/${hack.id}/edit`} className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors ml-4 shrink-0 inline-block text-center cursor-pointer relative z-10">
                    Edit Hackathon
                  </Link>
                </div>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{hack.problem}</p>
              </div>
            </LiquidGlass>
          ))}
          {hackathons.length === 0 && (
            <div className="text-center p-8 border border-white/5 rounded-xl bg-white/[0.02]">
              <p className="text-muted-foreground">No hackathons created yet.</p>
            </div>
          )}
        </div>

        <div>
          <LiquidGlass className="p-6 border-white/10 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Create Hackathon</h2>
            <HackathonForm users={allUsers} />
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}