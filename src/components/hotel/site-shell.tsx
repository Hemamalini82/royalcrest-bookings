import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "#home", label: "Home" }, { to: "#about", label: "About" },
  { to: "#rooms", label: "Rooms" }, { to: "#dining", label: "Dining" },
  { to: "#facilities", label: "Facilities" }, { to: "#book", label: "Book Now" },
  { to: "#contact", label: "Contact" }, { to: "#location", label: "Location" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return <header className="site-header"><div className="nav-inner">
    <a href="/#home" className="brand" onClick={() => setOpen(false)} aria-label="Royal Crest Hotel home"><span className="brand-symbol"><Crown size={22} strokeWidth={1.3}/></span><span className="brand-text"><strong>ROYAL CREST</strong><small>HOTEL & RESIDENCES</small></span></a>
    <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">{links.map(link => <a key={link.to} href={`${path === "/" ? "" : "/"}${link.to}`} className="nav-link" onClick={() => setOpen(false)}>{link.label}</a>)}</nav>
    <Button asChild variant="gold" size="sm" className="desktop-book"><a href="/#book">Book Your Stay <ArrowUpRight size={15}/></a></Button>
    <Button variant="iconGhost" size="icon" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
  </div></header>;
}

export function SiteFooter() { return <footer className="site-footer"><div className="container footer-grid">
  <div><a href="/#home" className="brand footer-brand"><span className="brand-symbol"><Crown size={22} strokeWidth={1.3}/></span><span className="brand-text"><strong>ROYAL CREST</strong><small>HOTEL & RESIDENCES</small></span></a><p>Where every stay becomes a story worth telling.</p></div>
  <div><span className="footer-title">EXPLORE</span><a href="/#rooms">Rooms & Suites</a><a href="/#dining">Dining</a><a href="/#facilities">Facilities</a></div>
  <div><span className="footer-title">PLAN YOUR STAY</span><a href="/#book">Book a Room</a><a href="/#location">Location</a><a href="/#contact">Contact Us</a></div>
  <div><span className="footer-title">CONNECT</span><p>Illustrative New Delhi location. Verified contact details are not yet available.</p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Royal Crest Hotel. A demonstration website.</span><span>Designed for memorable stays.</span></div></footer>; }

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="page-intro container"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>;
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
