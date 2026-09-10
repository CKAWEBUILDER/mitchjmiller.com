import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ResumeDownloadDialog } from "./resume-download-dialog";

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }, [location]);
  const links = [{ href: "/case-studies", label: "Selected work" }, { href: "/lab", label: "Interactive lab" }, { href: "/about", label: "About" }, { href: "/blog", label: "Field notes" }];
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="site-wrap header-inner">
        <Link href="/" className="wordmark" aria-label="Mitchell Miller home"><span className="monogram">m<span>m</span><i>.</i></span><span className="wordmark-name">MITCHELL MILLER<span>SEARCH · SYSTEMS · GROWTH</span></span></Link>
        <nav aria-label="Main navigation" className="desktop-nav">{links.map(l => <Link key={l.href} href={l.href} aria-current={location.startsWith(l.href) ? "page" : undefined}>{l.label}</Link>)}</nav>
        <Link href="/contact" className="header-contact">Let’s talk <ArrowUpRight size={16}/></Link>
        <button className="mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">{[...links,{href:"/resume",label:"Resumes"},{href:"/contact",label:"Let’s talk"}].map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}<ArrowUpRight size={18}/></Link>)}</nav>}
    </header>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><div className="site-wrap">
      <div className="footer-top"><div><p className="eyebrow">HAVE SOMETHING WORTH BUILDING?</p><Link className="footer-invite" href="/contact">Let’s connect the dots.<ArrowUpRight aria-hidden="true"/></Link></div><button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})} aria-label="Back to top"><ArrowUp/></button></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Mitchell Miller<br/><span>Strategy that gets built. Work you can explore.</span></p><nav aria-label="Footer navigation"><Link href="/resume">Resumes</Link><Link href="/collab-ideas">Work together</Link><Link href="/systems">My approach</Link><a href="https://linkedin.com/in/mitchelljmillerjr" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:mitchelljmillerjr26@gmail.com">Email ↗</a></nav><ResumeDownloadDialog><button className="footer-resume">Download a resume <ArrowUpRight size={16}/></button></ResumeDownloadDialog></div>
    </div></footer>
  </div>;
}
