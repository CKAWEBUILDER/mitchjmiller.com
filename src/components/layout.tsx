import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/aeo-geo", label: "AEO/GEO Lab" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-primary tracking-tight" data-testid="link-home">
            Mitchell Miller
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${location.startsWith(link.href) ? "text-secondary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/resume" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              Download Resume
            </Link>
          </nav>

          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-b border-border/40 bg-background px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium ${location.startsWith(link.href) ? "text-secondary" : "text-primary"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/resume" 
                className="text-sm font-medium text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Download Resume
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg text-primary mb-2">Mitchell Miller</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              SEO, AEO/GEO & AI Search Systems Leader. From data to decisions to systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-secondary">About</Link></li>
              <li><Link href="/work" className="hover:text-secondary">Work</Link></li>
              <li><Link href="/systems" className="hover:text-secondary">Systems</Link></li>
              <li><Link href="/selected-builds" className="hover:text-secondary">Selected Builds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>United States &middot; Remote-first</li>
              <li><a href="mailto:mitchelljmillerjr26@gmail.com" className="hover:text-secondary">Email</a></li>
              <li><a href="https://linkedin.com/in/mitchelljmillerjr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">LinkedIn</a></li>
              <li><Link href="/blog" className="hover:text-secondary">Signals & Systems Blog</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
