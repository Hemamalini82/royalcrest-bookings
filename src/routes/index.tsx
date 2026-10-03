import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Star, Wifi, MapPin, UtensilsCrossed, Waves, Dumbbell, CarFront, ConciergeBell, Coffee, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/hotel/site-shell";
import { RoomCard } from "@/components/hotel/room-card";
import { BookingSection } from "./book";
import { ContactSection } from "./contact";
import { rooms } from "@/lib/hotel-data";
import dining from "@/assets/dining.jpg";
import pool from "@/assets/pool.jpg";

export const Route = createFileRoute("/")({ head: () => ({ meta: [
  { title: "Royal Crest Hotel | Luxury, Comfort & Elegance" },
  { name: "description", content: "Explore elegant rooms, dining, facilities and location at Royal Crest Hotel, and send your booking request online." },
  { property: "og:title", content: "Royal Crest Hotel | Luxury, Comfort & Elegance" },
  { property: "og:description", content: "Elegant rooms, dining and hospitality at Royal Crest Hotel. Explore your next stay." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Index });

const facilities = [
  { icon: Waves, title: "Swimming Pool", text: "Refresh yourself or simply relax beside the water." },
  { icon: Wifi, title: "Free Wi-Fi", text: "Stay connected throughout your visit." },
  { icon: Dumbbell, title: "Gym", text: "Keep your routine going while you're away." },
  { icon: UtensilsCrossed, title: "Restaurant", text: "Good food and warm company at every meal." },
  { icon: CarFront, title: "Parking", text: "An easy arrival, with convenient parking." },
  { icon: ConciergeBell, title: "Room Service", text: "Comfort and dining delivered to your door." },
];

function Index() {
  const room = typeof window === "undefined" ? undefined : new URLSearchParams(window.location.search).get("room") ?? undefined;
  return <>
    <section id="home" className="hero"><div className="container hero-content"><div className="eyebrow"><span className="eyebrow-line"/> WELCOME TO ROYAL CREST <span className="eyebrow-line"/></div><h1>Royal Crest <em>Hotel</em></h1><p className="hero-tagline">Luxury • Comfort • Elegance</p><p>Where timeless elegance meets a stay that feels entirely your own.</p><div className="hero-actions"><Button asChild variant="gold"><a href="#book">Book Your Stay <ArrowUpRight size={17}/></a></Button><Button asChild variant="outlineGold"><a href="#rooms">Explore Rooms <ArrowUpRight size={17}/></a></Button></div><div className="hero-proof"><span><Star size={15}/> Thoughtful luxury</span><i/><span><MapPin size={15}/> Memorable setting</span><i/><span><Wifi size={15}/> Comfort in every detail</span></div></div></section>
    <section id="about" className="section-band"><div className="container split-layout"><img className="split-image" src={pool} alt="Royal Crest poolside lounge" loading="lazy"/><div className="split-copy"><SectionHeading eyebrow="ABOUT ROYAL CREST" title="The art of feeling at home"/><p>Royal Crest Hotel is a place to slow down, settle in, and enjoy the finer moments. Our inviting spaces bring together timeless style and modern comfort, with a warm welcome waiting at every turn.</p><p>Whether you're visiting for a weekend away or a change of scenery, make each stay distinctly yours.</p></div></div></section>
    <section id="rooms" className="section-band soft"><div className="container"><div className="section-heading center"><SectionHeading eyebrow="OUR ACCOMMODATIONS" title="Rooms & Suites" text="Find your perfect place to pause, from restful rooms to spacious suites."/></div><div className="room-grid">{rooms.map(room => <RoomCard key={room.name} room={room}/>)}</div></div></section>
    <section id="dining" className="section-band"><div className="container split-layout"><img className="split-image" src={dining} alt="Elegant restaurant dining room with a beautifully set table" loading="lazy"/><div className="split-copy"><SectionHeading eyebrow="DINING AT ROYAL CREST" title="Every occasion deserves a little magic"/><p>Our welcoming restaurant pairs thoughtfully prepared cuisine with an easy sense of occasion. From breakfast before a busy day to dinner that turns into a long evening, there's always a place at our table.</p><div className="dining-highlights"><span><Coffee size={19}/> Slow mornings</span><span><UtensilsCrossed size={19}/> Wonderful evenings</span><span><Wine size={19}/> Time to unwind</span></div></div></div></section>
    <section id="facilities" className="section-band soft"><div className="container"><div className="section-heading center"><SectionHeading eyebrow="EVERYTHING IN ITS PLACE" title="Facilities & Amenities" text="Thoughtful comforts to make your time with us feel effortless."/></div><div className="feature-grid">{facilities.map(item => <div className="feature" key={item.title}><item.icon/><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div></section>
    <BookingSection embedded room={room}/>
    <ContactSection embedded/>
    <section id="location" className="section-band soft"><div className="container"><div className="section-heading center"><SectionHeading eyebrow="FIND YOUR WAY" title="The heart of it all" text="Explore the illustrative city setting of Royal Crest Hotel."/></div><div className="map-wrap"><iframe title="Map of central New Delhi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=77.192%2C28.614%2C77.238%2C28.642&amp;layer=mapnik&amp;marker=28.628%2C77.215"/></div><p className="location-note"><MapPin size={14}/> 24 Heritage Boulevard, Central District, New Delhi — illustrative address, not a real hotel destination.</p></div></section>
  </>;
}
