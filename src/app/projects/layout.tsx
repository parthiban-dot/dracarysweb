import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Archive",
  description: "Explore DRACARYS production-grade applications, internal tools, and open-source solutions.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
