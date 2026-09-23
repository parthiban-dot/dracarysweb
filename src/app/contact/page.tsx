"use client";

import { useState, useTransition } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/shared/section-header";
import { LiquidGlass } from "@/components/shared/liquid-glass";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/actions/contact";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactPage() {
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
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      category: formData.get("category") as "Client" | "Collaboration" | "Hackathon" | "Recruitment" | "General",
      message: formData.get("message") as string,
    };

    startTransition(() => {
      // Basic client-side spoofing for IP (since Server Actions don't easily get request headers without wrapping)
      const mockIp = typeof window !== 'undefined' ? "client-ip" : "unknown";
      submitContactForm(data, mockIp)
        .then((result) => {
          if (result.error) setError(result.error);
          if (result.success) {
            setSuccess(result.success);
            (e.target as HTMLFormElement).reset();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Section className="min-h-screen pt-32 relative">
      <Container>
        <SectionHeader 
          title="INITIALIZE COMMUNICATION"
          description="Reach out to DRACARYS for project inquiries, collaborations, or hackathon partnerships."
        />

        <div className="max-w-2xl mx-auto mt-12 relative z-10">
          <LiquidGlass className="p-8">
            {success ? (
              <div className="text-center py-12 space-y-6">
                <div className="mx-auto w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Transmission Successful</h3>
                <p className="text-muted-foreground">{success}</p>
                <Button variant="outline" onClick={() => setSuccess(undefined)} className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {error && (
                  <div className="bg-destructive/20 border border-destructive text-destructive p-4 rounded-md flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" /> {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-accent">*</span></Label>
                    <Input id="name" name="name" required disabled={isPending} className="bg-black/50 border-white/10" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-accent">*</span></Label>
                    <Input id="email" name="email" type="email" required disabled={isPending} className="bg-black/50 border-white/10" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input id="organization" name="organization" disabled={isPending} className="bg-black/50 border-white/10" placeholder="Company or University" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Inquiry Category <span className="text-accent">*</span></Label>
                    <select 
                      id="category" 
                      name="category" 
                      required 
                      disabled={isPending}
                      className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled selected>Select Category...</option>
                      <option value="Client">Client Project</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Hackathon">Hackathon Team-up</option>
                      <option value="Recruitment">Recruitment</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message <span className="text-accent">*</span></Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    disabled={isPending} 
                    className="bg-black/50 border-white/10 min-h-[150px]" 
                    placeholder="Provide details about your inquiry..." 
                  />
                </div>

                <Button type="submit" disabled={isPending} className="w-full dragon-glow font-bold tracking-wide">
                  {isPending ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> TRANSMIT MESSAGE</>
                  )}
                </Button>
              </form>
            )}
          </LiquidGlass>
        </div>
      </Container>
    </Section>
  );
}
