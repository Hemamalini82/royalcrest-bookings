import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Crown, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/dining", label: "Dining" },
  { to: "/facilities", label: "Facilities" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return <header className="site-header">
    <div className="nav-inner">
      <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Royal Crest Hotel home">
        <span className="brand-symbol"><Crown size={22} strokeWidth={1.3} /></span>
        <span className="brand-text"><strong>ROYAL CREST</strong><small>HOTEL & RESIDENCES</small></span>
      </Link>
      <nav className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
        {links.map(link => <Link key={link.to} to={link.to} className={`nav-link ${path === link.to ? "is-active" : ""}`} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <Button asChild variant="gold" size="sm" className="mobile-book"><Link to="/book" onClick={() => setOpen(false)}>Book Now <ArrowUpRight size={15}/></Link></Button>
      </nav>
      <Button asChild variant="gold" size="sm" className="desktop-book"><Link to="/book">Book Your Stay <ArrowUpRight size={15}/></Link></Button>
      <Button variant="iconGhost" size="icon" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Link to="/" className="brand footer-brand"><span className="brand-symbol"><Crown size={22} strokeWidth={1.3}/></span><span className="brand-text"><strong>ROYAL CREST</strong><small>HOTEL & RESIDENCES</small></span></Link><p>Where every stay becomes a story worth telling.</p></div>
    <div><span className="footer-title">EXPLORE</span><Link to="/rooms">Rooms & Suites</Link><Link to="/dining">Dining</Link><Link to="/facilities">Facilities</Link></div>
    <div><span className="footer-title">PLAN YOUR STAY</span><Link to="/book">Book a Room</Link><Link to="/location">Location</Link><Link to="/contact">Contact Us</Link></div>
    <div><span className="footer-title">CONNECT</span><p>24 Heritage Boulevard<br/>Central District, New Delhi</p><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18}/></a></div></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Royal Crest Hotel. A demonstration website.</span><span>Designed for memorable stays.</span></div></footer>;
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="page-intro container"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>;
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
