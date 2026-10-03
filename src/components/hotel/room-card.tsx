import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BedDouble, Maximize2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currency, rooms } from "@/lib/hotel-data";

export function RoomCard({ room }: { room: (typeof rooms)[number] }) {
  return <article className="room-card"><div className="room-image"><img src={room.image} alt={`${room.name} interior`} loading="lazy" width={960} height={720}/><span className="room-price-tag">FROM {currency(room.price)} / NIGHT</span></div><div className="room-details"><div className="room-facts"><span><Maximize2 size={14}/>{room.size}</span><span><Users size={14}/>{room.guests}</span></div><h3>{room.name}</h3><p>{room.description}</p><div className="amenities"><BedDouble size={16}/>{room.amenities.join("  ·  ")}</div><Button asChild variant="outlineGold" className="room-action"><Link to="/book" search={{ room: room.name }}>Book This Room <ArrowUpRight size={17}/></Link></Button></div></article>;
}
