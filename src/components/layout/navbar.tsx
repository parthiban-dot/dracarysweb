"use client";

import Link from "next/link"
import Image from "next/image"
import logoImage from "../../../public/dracarys-logo.jpg"
import { usePathname, useRouter } from "next/navigation"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { Menu, X, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/founder", label: "Founder" },
  { href: "/projects", label: "Projects" },
  { href: "/hackathons", label: "Hackathons" },
];

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleMobileNav = (href: string) => {
    setMobileOpen(false)
    router.push(href)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link prefetch={true} href="/" className="flex items-center space-x-3 group">
                <Image src={logoImage} alt="DRACARYS Logo" width={32} height={32} className="w-8 h-8 rounded-md object-cover border border-white/10 group-hover:border-primary/50 transition-colors" />
                <span className="text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary group-hover:opacity-80 transition-opacity hidden sm:inline-block">
                  DRACARYS
                </span>
              </Link>
              <nav className="hidden md:flex gap-6 text-sm font-medium">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "transition-colors hover:text-primary relative",
                      pathname === link.href ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <Link prefetch={true} href="/join" className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                  Join
                </Link>
                <Button asChild variant="outline" className="glass-panel text-foreground border-white/10 hover:bg-white/5 h-8 px-4 text-xs">
                  <Link prefetch={true} href="/login">Login</Link>
                </Button>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-foreground hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden flex flex-col"
          style={{ background: "rgba(5, 8, 18, 0.97)", backdropFilter: "blur(20px)" }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Image src={logoImage} alt="DRACARYS Logo" width={36} height={36} className="w-9 h-9 rounded-md object-cover border border-primary/30" />
              <span className="text-lg font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                DRACARYS
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-md border border-white/10 text-foreground/60 hover:text-white hover:border-white/30 transition-all"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col flex-1 px-6 pt-6 gap-1">
            {links.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleMobileNav(link.href)}
                className={cn(
                  "flex items-center w-full text-left px-4 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 group",
                  pathname === link.href
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-foreground/60 hover:text-white hover:bg-white/5"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {pathname === link.href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
                {link.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-4" />

            <button
              onClick={() => handleMobileNav("/join")}
              className="flex items-center w-full text-left px-4 py-3.5 rounded-xl text-lg font-semibold text-foreground/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Join
            </button>
            <button
              onClick={() => handleMobileNav("/login")}
              className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-all mt-1"
            >
              Login
            </button>
          </nav>

          {/* Bottom Tagline */}
          <div className="px-6 py-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-primary" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/40">
                Build · Compete · Learn · Ship
              </p>
            </div>
            <p className="text-xs text-foreground/25">
              © {new Date().getFullYear()} DRACARYS Engineering Team
            </p>
          </div>
        </div>
      )}
    </>
  )
}
