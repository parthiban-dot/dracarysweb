import Link from "next/link"
import Image from "next/image"
import logoImage from "../../../public/dracarys-logo.jpg"
import { Container } from "./container"
import { Flame, ArrowRight } from "lucide-react"

const footerLinks = {
  platform: [
    { href: "/projects", label: "Projects" },
    { href: "/hackathons", label: "Hackathons" },
  ],
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Team" },
    { href: "/founder", label: "Founder" },
    { href: "/join", label: "Join DRACARYS" },
    { href: "/contact", label: "Contact" },
  ],
  connect: [
    { href: "https://github.com/parthiban-dot", label: "GitHub", external: true },
    { href: "/hire", label: "Hire Us", external: false },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/80 backdrop-blur-sm relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-20 bg-primary/5 blur-3xl pointer-events-none rounded-full" />

      <Container className="relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <Image
                src={logoImage}
                alt="DRACARYS Logo"
                width={44}
                height={44}
                className="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:border-primary/40 transition-colors"
              />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-kaushan)", letterSpacing: "0.02em" }}>
                DRACARYS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              A student-led technology collective building production-grade applications, solving real problems, and competing on global stages.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              Join the team
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Platform */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-foreground/40 mb-5">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organization */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-foreground/40 mb-5">Organization</h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-foreground/40 mb-5">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label} {link.external && "â†—"}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Have a project in mind?{" "}
                <Link href="/hire" className="text-primary hover:underline font-medium">
                  Let&apos;s build it together.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-foreground/30">
              Build Â· Compete Â· Learn Â· Ship
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Â© {new Date().getFullYear()} DRACARYS. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
