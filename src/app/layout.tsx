import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DragonAtmosphere } from "@/components/shared/dragon-atmosphere";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://dracarysweb.vercel.app"),
  title: {
    default: "DRACARYS | Ancient Dragon Ã— Modern Technology",
    template: "%s | DRACARYS"
  },
  description: "DRACARYS is a student-led engineering team building real-world software, experimenting with AI and competing in hackathons.",
  openGraph: {
    title: "DRACARYS | Ancient Dragon Ã— Modern Technology",
    description: "DRACARYS is a student-led engineering team building real-world software, experimenting with AI and competing in hackathons.",
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
