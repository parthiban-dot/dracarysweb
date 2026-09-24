import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DragonAtmosphere } from "@/components/shared/dragon-atmosphere";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://dracarys.local"),
  title: {
    default: "DRACARYS | Ancient Dragon × Modern Technology",
    template: "%s | DRACARYS"
  },
  description: "DRACARYS is a student-led technology collective building real products, solving real problems, and competing on global stages.",
  openGraph: {
    title: "DRACARYS | Ancient Dragon × Modern Technology",
    description: "A student-led technology collective building production-grade applications.",
    url: "/",
    siteName: "DRACARYS",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased flex flex-col relative`}>
        <DragonAtmosphere />
        <Navbar />
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
