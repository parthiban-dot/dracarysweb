import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Team",
  description: "Meet the architects, engineers, and designers behind the code at DRACARYS.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
