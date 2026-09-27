import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditHackathonForm } from "./edit-hackathon-form";

const prisma = new PrismaClient();

export default async function EditHackathonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const dbHackathon = await prisma.hackathon.findUnique({
    where: { id },
    include: {
      teamMembers: true
    }
  });

  const hackathon = dbHackathon ? JSON.parse(JSON.stringify(dbHackathon)) : null;

  if (!hackathon) {
    redirect("/dashboard/admin/hackathons");
  }

  const dbUsers = await prisma.user.findMany({
    where: { status: "APPROVED" },
    orderBy: { name: "asc" }
  });

  const allUsers = JSON.parse(JSON.stringify(dbUsers));

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/hackathons" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-1 flex items-center gap-3">
            Edit Hackathon
          </h1>
          <p className="text-muted-foreground text-sm">Update details and manage team members for {hackathon.name}.</p>
        </div>
      </div>

      <LiquidGlass className="p-8 border-white/10">
        <EditHackathonForm hackathon={hackathon} users={allUsers} />
      </LiquidGlass>
    </div>
  );
}