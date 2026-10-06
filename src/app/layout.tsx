import type { Metadata } from "next";
import { Manrope, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DragonAtmosphere } from "@/components/shared/dragon-atmosphere";
import { PageTransition } from "@/components/layout/page-transition";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const kaushanScript = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-kaushan" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://dracarysweb.vercel.app"),
  title: {
    default: "DRACARYS | Ancient Dragon x Modern Technology",
    template: "%s | DRACARYS"
  },
  description: "DRACARYS is a student-led technology collective building real products, solving real problems, and competing on global stages.",
  openGraph: {
    title: "DRACARYS | Ancient Dragon x Modern Technology",
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
      <body className={`${manrope.variable} ${kaushanScript.variable} min-h-screen bg-background font-sans antialiased flex flex-col relative`} style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <DragonAtmosphere />
        <Navbar />
        <main className="flex-1 flex flex-col relative">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
