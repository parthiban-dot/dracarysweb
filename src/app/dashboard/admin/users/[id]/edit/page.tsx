import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { UserCog } from "lucide-react";
import { EditMemberForm } from "./edit-member-form";

const prisma = new PrismaClient();

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true }
  });

  if (!user) {
    redirect("/dashboard/admin/users");
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
          <UserCog className="w-8 h-8 text-primary" /> Edit Member
        </h1>
        <p className="text-muted-foreground text-lg">
          Modify details, roles, and profile information for {user.name}.
        </p>
      </div>

      <LiquidGlass className="p-8 border-white/10">
        <EditMemberForm user={user} />
      </LiquidGlass>
    </div>
  );
}