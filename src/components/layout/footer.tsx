import Link from "next/link"
import Image from "next/image"
import logoImage from "../../../public/dracarys-logo.jpg"
import { Container } from "./container"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/80 backdrop-blur-sm py-12 relative overflow-hidden">
      <div className="absolute inset-0 scale-texture opacity-[0.03] pointer-events-none" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src={logoImage} alt="DRACARYS Logo" width={40} height={40} className="w-10 h-10 rounded-lg object-cover border border-white/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
              <span className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                DRACARYS
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A student-led technology team building real products, solving real problems, and competing on real-world stages.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground/90">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/hackathons" className="hover:text-primary transition-colors">Hackathons</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground/90">Organization</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/team" className="hover:text-primary transition-colors">Team</Link></li>
              <li><Link href="/join" className="hover:text-primary transition-colors">Join DRACARYS</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DRACARYS. All rights reserved.
          </p>
          <div className="flex gap-4">
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
  )
}
