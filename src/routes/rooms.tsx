import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/hotel/site-shell";
import { RoomCard } from "@/components/hotel/room-card";
import { rooms } from "@/lib/hotel-data";
export const Route = createFileRoute("/rooms")({ head: () => ({ meta: [{ title: "Rooms & Suites | Royal Crest Hotel" }, { name: "description", content: "Explore Deluxe, Premium, Executive, and Royal rooms at Royal Crest Hotel, with rates starting from ₹3,999 per night." }, { property: "og:title", content: "Rooms & Suites | Royal Crest Hotel" }, { property: "og:description", content: "Discover the perfect room for your stay, from inviting Deluxe Rooms to the Royal Suite." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Rooms });
function Rooms() { return <><PageIntro eyebrow="REST BEAUTIFULLY" title="Rooms & Suites" text="Four ways to feel at home. Find the space that suits your stay and leave the rest to us."/><section className="section-band"><div className="container room-grid">{rooms.map(room => <RoomCard key={room.name} room={room}/>)}</div></section></>; }
