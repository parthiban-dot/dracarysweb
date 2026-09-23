"use client";

import { useState } from "react";
import { deleteMember, updateMemberRole, toggleMemberApproval } from "@/actions/admin";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Shield, Trash2, CheckCircle, XCircle } from "lucide-react";

interface UserItem {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
  profile?: {
    memberTag?: string | null;
    isApproved?: boolean;
  } | null;
}

interface MembersClientProps {
  initialUsers: UserItem[];
  currentUserRole: string;
}

export function MembersClient({ initialUsers, currentUserRole }: MembersClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    const res = await deleteMember(id);
    if (res.error) setError(res.error);
    else setUsers(users.filter(u => u.id !== id));
  };

  const handleRoleChange = async (id: string, newRole: "MEMBER" | "PROJECT_LEAD" | "ADMIN") => {
    const res = await updateMemberRole(id, newRole);
    if (res.error) setError(res.error);
    else {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    }
  };

  const handleToggleApproval = async (id: string, currentApprovedStatus: boolean) => {
    const newStatus = !currentApprovedStatus;
    const res = await toggleMemberApproval(id, newStatus);
    if (res.error) setError(res.error);
    else {
      setUsers(users.map(u => {
        if (u.id === id) {
          return {
            ...u,
            profile: {
              ...(u.profile || {}),
              isApproved: newStatus,
            },
          };
        }
        return u;
      }));
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-destructive text-sm mb-4 bg-destructive/10 p-3 rounded">{error}</div>}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-foreground">
            <tr>
              <th className="p-4 rounded-tl-lg font-medium">Name & Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 rounded-tr-lg font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(user => {
              const isApproved = user.profile?.isApproved ?? false;

              return (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <p className="font-bold">{user.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.profile?.memberTag && (
                      <p className="text-xs text-primary/80 font-mono mt-0.5">{user.profile.memberTag}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      user.role === 'SUPER_ADMIN' ? 'bg-accent/20 text-accent' :
                      user.role === 'ADMIN' ? 'bg-primary/20 text-primary' :
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${
                      isApproved 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {isApproved ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> Approved
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Pending Review
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {user.role !== "SUPER_ADMIN" && (
                      <Button
                        variant={isApproved ? "outline" : "default"}
                        size="sm"
                        className={isApproved ? "border-white/10 text-xs" : "dragon-glow text-xs"}
                        onClick={() => handleToggleApproval(user.id, isApproved)}
                      >
                        {isApproved ? "Revoke Access" : "Approve Member (Yes)"}
                      </Button>
                    )}

                    {currentUserRole === "SUPER_ADMIN" && user.role !== "SUPER_ADMIN" && (
                       <ConfirmDialog 
                          title="Promote to Admin?"
                          description={`Are you sure you want to promote ${user.email} to ADMIN? They will have full system access.`}
                          onConfirm={() => handleRoleChange(user.id, "ADMIN")}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              <Shield className="w-4 h-4" />
                            </Button>
                          }
                       />
                    )}
                    
                    {user.role !== "SUPER_ADMIN" && (
                      <ConfirmDialog 
                        title="Delete Member?"
                        description={`Are you sure you want to delete ${user.email}? This action is permanent and will cascade to all their data.`}
                        onConfirm={() => handleDelete(user.id)}
                        trigger={
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        }
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
