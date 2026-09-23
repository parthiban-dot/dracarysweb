import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Initialize communication with DRACARYS for projects, collaborations, or hackathons.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
