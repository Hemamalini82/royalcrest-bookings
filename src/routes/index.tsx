import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star, Wifi, MapPin, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/hotel/site-shell";
import { RoomCard } from "@/components/hotel/room-card";
import { rooms } from "@/lib/hotel-data";
import dining from "@/assets/dining.jpg";

export const Route = createFileRoute("/")({ head: () => ({ meta: [
  { title: "Royal Crest Hotel | A Stay Above the Ordinary" },
  { name: "description", content: "Discover elegant rooms, memorable dining, and warm hospitality at Royal Crest Hotel. Explore your next stay." },
  { property: "og:title", content: "Royal Crest Hotel | A Stay Above the Ordinary" },
  { property: "og:description", content: "Elegant rooms, memorable dining, and warm hospitality at Royal Crest Hotel." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Index });

function Index() { return <>
  <section className="hero"><div className="container hero-content"><div className="eyebrow"><span className="eyebrow-line"/> WELCOME TO ROYAL CREST <span className="eyebrow-line"/></div><h1>Royal Crest <em>Hotel</em></h1><p>Where timeless elegance meets a stay that feels entirely your own. Discover a little more of everything you love.</p><div className="hero-actions"><Button asChild variant="gold"><Link to="/book">Book Your Stay <ArrowUpRight size={17}/></Link></Button><Button asChild variant="outlineGold"><Link to="/rooms">Explore Rooms <ArrowUpRight size={17}/></Link></Button></div><div className="hero-proof"><span><Star size={15}/> Thoughtful luxury</span><i/><span><MapPin size={15}/> Central location</span><i/><span><Wifi size={15}/> Comfort in every detail</span></div></div></section>
  <section className="section-band"><div className="container"><div className="section-heading center"><SectionHeading eyebrow="THE ROYAL CREST EXPERIENCE" title="A place to make your own" text="Beautifully considered spaces, genuine hospitality, and the freedom to enjoy every moment at your own pace."/></div><div className="feature-grid"><div className="feature"><Star/><h3>Stay beautifully</h3><p>Rest easy in rooms designed around the little things that make a big difference.</p></div><div className="feature"><UtensilsCrossed/><h3>Savour every moment</h3><p>From slow mornings to memorable evenings, discover dining worth lingering over.</p></div><div className="feature"><MapPin/><h3>Perfectly placed</h3><p>Feel right at home with the best of the city within easy reach.</p></div></div></div></section>
  <section className="section-band soft"><div className="container"><div className="section-heading center"><SectionHeading eyebrow="OUR ACCOMMODATIONS" title="Rooms made for you" text="Find your perfect place to pause, from restful rooms to spacious suites."/></div><div className="room-grid">{rooms.slice(0, 2).map(room => <RoomCard key={room.name} room={room}/>)}</div><div style={{ textAlign: "center", marginTop: 32 }}><Link to="/rooms" className="text-action">Explore all rooms <ArrowUpRight size={16}/></Link></div></div></section>
  <section className="section-band"><div className="container split-layout"><img className="split-image" src={dining} alt="Candlelit dining room at Royal Crest Hotel" loading="lazy" width={1104} height={864}/><div className="split-copy"><SectionHeading eyebrow="A TASTE OF ROYAL CREST" title="Dining to remember"/><p>A table for every occasion. Gather over thoughtfully prepared dishes, warm conversation, and an atmosphere that makes you want to stay a little longer.</p><Link to="/dining" className="text-action">Discover dining <ArrowUpRight size={16}/></Link></div></div></section>
  <section className="cta-band"><div className="container"><div className="eyebrow" style={{justifyContent:"center"}}><span className="eyebrow-line"/> YOUR NEXT ESCAPE AWAITS</div><h2>Make room for something special.</h2><p>Your Royal Crest experience begins here.</p><Button asChild variant="gold"><Link to="/book">Book Your Stay <ArrowUpRight size={17}/></Link></Button></div></section>
</>; }
