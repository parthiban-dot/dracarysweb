import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Launchers",
  description: "Open-source tools, templates, and utilities built by DRACARYS.",
};

export default function FreeLaunchersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
