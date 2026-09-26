"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminUpdateMember } from "@/actions/admin-edit-member";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function EditMemberForm({ user }: { user: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await adminUpdateMember(user.id, formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess("Member profile updated successfully.");
      }
      setLoading(false);
    } catch (err) {
      setError("An unexpected error occurred. Please check your inputs.");
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-2 text-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={user.name || ""} 
            required 
            className="bg-black/40 border-white/10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="memberTag">Member Tag</Label>
          <Input 
            id="memberTag" 
            name="memberTag" 
            defaultValue={user.profile?.memberTag || ""} 
            required 
            className="bg-black/40 border-white/10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="year">Year of Study / Grad Year</Label>
          <Input 
            id="year" 
            name="year" 
            defaultValue={user.profile?.year || ""} 
            className="bg-black/40 border-white/10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role Type</Label>
          <select 
            id="role" 
            name="role"
            defaultValue={user.role} 
            className="w-full bg-black/40 border border-white/10 rounded-md px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10 text-white"
          >
            <option value="MEMBER">Member</option>
            <option value="PROJECT_LEAD">Project Lead</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Tech Stack (Comma separated)</Label>
        <Input 
          id="skills" 
          name="skills" 
          defaultValue={user.profile?.skills?.join(", ") || ""} 
          required 
          className="bg-black/40 border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          name="bio" 
          defaultValue={user.profile?.bio || ""} 
          className="bg-black/40 border-white/10 resize-none h-24"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub Profile URL</Label>
          <Input 
            id="githubUrl" 
            name="githubUrl" 
            type="text"
            defaultValue={user.profile?.githubUrl || ""} 
            className="bg-black/40 border-white/10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
          <Input 
            id="linkedinUrl" 
            name="linkedinUrl" 
            type="text"
            defaultValue={user.profile?.linkedinUrl || ""} 
            className="bg-black/40 border-white/10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagramUrl">Instagram Profile URL</Label>
          <Input 
            id="instagramUrl" 
            name="instagramUrl" 
            type="text"
            defaultValue={user.profile?.instagramUrl || ""} 
            className="bg-black/40 border-white/10"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href="/dashboard/admin/users" className="flex-1">
          <Button type="button" variant="outline" size="lg" className="w-full">
            Cancel
          </Button>
        </Link>
        <Button type="submit" size="lg" className="flex-1 dragon-glow font-bold" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}