import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "Explore the global hackathons and competitions DRACARYS has conquered.",
};

export default function HackathonsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
