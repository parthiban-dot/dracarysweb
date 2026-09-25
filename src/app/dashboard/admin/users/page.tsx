import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { ShieldAlert, Check, X, Shield, User as UserIcon, Trash2, Pencil } from "lucide-react";
import { updateUserApproval, promoteToAdmin, deleteUser } from "@/actions/admin";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
  const session = await auth();

  // Extra security check just in case
  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tighter text-white mb-2 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-primary" /> Manage Members
        </h1>
        <p className="text-muted-foreground text-lg">Manage member approvals, roles, and platform access.</p>
      </div>

      <LiquidGlass className="p-1 overflow-x-auto border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-sm text-muted-foreground uppercase tracking-wider">User</th>
              <th className="p-4 font-bold text-sm text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="p-4 font-bold text-sm text-muted-foreground uppercase tracking-wider">Role</th>
              <th className="p-4 font-bold text-sm text-muted-foreground uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {u.image ? (
                      <img src={u.image} alt="" className="w-10 h-10 rounded-full border border-white/10" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white/50" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white">{u.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    u.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                    u.status === "REJECTED" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                    "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    u.role === "SUPER_ADMIN" ? "bg-primary/10 text-primary border border-primary/20" :
                    u.role === "ADMIN" ? "bg-primary/10 text-primary border border-primary/20" :
                    u.role === "MEMBER" ? "bg-secondary/10 text-secondary border border-secondary/20" :
                    "bg-white/10 text-white/70 border border-white/20"
                  }`}>
                    {(u.role === "ADMIN" || u.role === "SUPER_ADMIN") && <Shield className="w-3 h-3 mr-1" />}
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {u.status !== "APPROVED" && (
                      <form action={updateUserApproval.bind(null, u.id, "APPROVED")}>
                        <button type="submit" className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                    {u.status !== "REJECTED" && (
                      <form action={updateUserApproval.bind(null, u.id, "REJECTED")}>
                        <button type="submit" className="p-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                    {session?.user?.role === "SUPER_ADMIN" && u.role !== "SUPER_ADMIN" && u.role !== "ADMIN" && u.status === "APPROVED" && (
                      <form action={promoteToAdmin.bind(null, u.id)}>
                        <button type="submit" className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors">
                          Make Admin
                        </button>
                      </form>
                    )}
                    <Link href={`/dashboard/admin/users/${u.id}/edit`} className="p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors ml-2" title="Edit Member">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {session?.user?.id !== u.id && (
                      <form action={deleteUser.bind(null, u.id)}>
                        <button type="submit" className="p-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ml-2" title="Remove Member">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </LiquidGlass>
    </div>
  );
}