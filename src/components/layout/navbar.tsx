"use client";

import Link from "next/link"
import Image from "next/image"
import logoImage from "../../../public/dracarys-logo.jpg"
import { usePathname } from "next/navigation"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-3 group">
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
              <Link href="/join" className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors">
                Join
              </Link>
              <Button asChild variant="outline" className="glass-panel text-foreground border-white/10 hover:bg-white/5 h-8 px-4 text-xs">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            
            {/* Mobile Nav */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-white/10 w-full sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-white/10 my-4" />
                  <Link href="/join" className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors">
                    Join
                  </Link>
                  <Link href="/login" className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors">
                    Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
