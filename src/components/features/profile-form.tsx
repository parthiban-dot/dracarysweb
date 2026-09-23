"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface ProfileFormProps {
  initialData: {
    name: string;
    bio: string;
    githubUrl: string;
    linkedinUrl: string;
    skills: string;
    year: string;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setSuccess(undefined);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      githubUrl: formData.get("githubUrl") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      skills: formData.get("skills") as string,
      year: formData.get("year") as string,
    };

    startTransition(() => {
      updateProfile(data)
        .then((result) => {
          if (result.error) {
            setError(result.error);
          }
          if (result.success) {
            setSuccess(result.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/20 border border-destructive text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {success && (
        <div className="bg-accent/20 border border-accent text-accent p-3 rounded-md flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4" /> {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Display Name</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={initialData.name} 
            disabled={isPending}
            className="bg-black/50 border-white/10 focus-visible:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="githubUrl">GitHub Profile URL</Label>
            <Input 
              id="githubUrl" 
              name="githubUrl" 
              type="url"
              defaultValue={initialData.githubUrl} 
              disabled={isPending}
              className="bg-black/50 border-white/10 focus-visible:ring-primary"
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
            <Input 
              id="linkedinUrl" 
              name="linkedinUrl" 
              type="url"
              defaultValue={initialData.linkedinUrl} 
              disabled={isPending}
              className="bg-black/50 border-white/10 focus-visible:ring-primary"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="year">Status / Year</Label>
          <Input 
            id="year" 
            name="year" 
            defaultValue={initialData.year} 
            disabled={isPending}
            className="bg-black/50 border-white/10 focus-visible:ring-primary"
            placeholder="e.g. Senior, Alumni, Member"
          />
        </div>

        <div>
          <Label htmlFor="skills">Skills (Comma separated)</Label>
          <Input 
            id="skills" 
            name="skills" 
            defaultValue={initialData.skills} 
            disabled={isPending}
            className="bg-black/50 border-white/10 focus-visible:ring-primary"
            placeholder="React, TypeScript, Python"
          />
        </div>

        <div>
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea 
            id="bio" 
            name="bio" 
            defaultValue={initialData.bio} 
            disabled={isPending}
            className="bg-black/50 border-white/10 focus-visible:ring-primary min-h-[100px]"
            placeholder="Tell the collective about yourself..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto dragon-glow">
        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}
