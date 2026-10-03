import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CalendarDays, ShieldCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/hotel/site-shell";
import { submitBooking } from "@/lib/hotel-submissions.functions";
import { currency, rooms } from "@/lib/hotel-data";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  checkin: z.string().min(1, "Please choose a check-in date."),
  checkout: z.string().min(1, "Please choose a check-out date."),
  guests: z.coerce.number().int().min(1).max(4),
  room: z.enum(["Deluxe Room", "Premium Room", "Executive Suite", "Royal Suite"]),
}).refine(data => data.checkin >= new Date().toLocaleDateString("en-CA"), { message: "Check-in cannot be in the past.", path: ["checkin"] }).refine(data => data.checkout > data.checkin, { message: "Check-out must be after check-in.", path: ["checkout"] }).refine(data => { const maxGuests = data.room === "Royal Suite" ? 4 : data.room === "Executive Suite" ? 3 : 2; return data.guests <= maxGuests; }, { message: "This room cannot accommodate that many guests.", path: ["guests"] });

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({ room: typeof search.room === "string" && rooms.some(r => r.name === search.room) ? search.room : undefined }),
  head: () => ({ meta: [{ title: "Book Your Stay | Royal Crest Hotel" }, { name: "description", content: "Choose your room and dates at Royal Crest Hotel. Try the booking form and see your stay summary instantly." }, { property: "og:title", content: "Book Your Stay | Royal Crest Hotel" }, { property: "og:description", content: "Plan your next stay at Royal Crest Hotel." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BookingPage,
});
export function BookingSection({ embedded = false }: { embedded?: boolean }) {
  const { room } = Route.useSearch();
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{ name: string; room: string; checkin: string; checkout: string; guests: number; total: number } | null>(null);
  const today = new Date().toLocaleDateString("en-CA");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setConfirmation(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = bookingSchema.safeParse(data);
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Please check your details."); return; }
    const selected = rooms.find(r => r.name === result.data.room);
    if (!selected) return;
    const nights = Math.round((new Date(`${result.data.checkout}T12:00:00`).getTime() - new Date(`${result.data.checkin}T12:00:00`).getTime()) / 86400000);
    setBusy(true);
    try {
      const saved = await submitBooking({ data: result.data });
      setConfirmation({ name: result.data.name, room: selected.name, checkin: result.data.checkin, checkout: result.data.checkout, guests: result.data.guests, total: saved.total });
      form.reset();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save your request."); } finally { setBusy(false); }
  }
  return <>{!embedded && <PageIntro eyebrow="MAKE IT YOURS" title="Book Your Stay" text="The best moments begin with a little planning. Tell us what your perfect stay looks like."/>}<section id={embedded ? "book" : undefined} className="section-band"><div className="container form-layout"><div className="form-panel"><h2>Plan your visit</h2><p>Fill in your stay details to see a booking summary.</p><form onSubmit={submit} noValidate><div className="form-grid">
    <div className="form-field full"><label htmlFor="guest-name">Guest name</label><input id="guest-name" name="name" placeholder="Your full name" autoComplete="name" maxLength={100} required/></div>
    <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={255} required/></div>
    <div className="form-field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" maxLength={20} required/></div>
    <div className="form-field"><label htmlFor="checkin">Check-in date</label><input id="checkin" name="checkin" type="date" min={today} required/></div>
    <div className="form-field"><label htmlFor="checkout">Check-out date</label><input id="checkout" name="checkout" type="date" min={today} required/></div>
    <div className="form-field"><label htmlFor="guests">Number of guests</label><select id="guests" name="guests" defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option></select></div>
    <div className="form-field"><label htmlFor="room">Room type</label><select id="room" name="room" defaultValue={room ?? "Deluxe Room"} key={room}>{rooms.map(r => <option key={r.name} value={r.name}>{r.name} — {currency(r.price)}/night</option>)}</select></div>
  </div>{error && <p role="alert" className="form-error">{error}</p>}<Button type="submit" disabled={busy} variant="gold" className="form-submit">{busy ? "Saving request..." : "Confirm Booking"}</Button><p className="form-note">Your request is saved for follow-up. This is not a confirmed reservation; no payment is collected.</p></form>
  {confirmation && <div className="form-success" role="status"><strong>Booking request received for {confirmation.name}.</strong>{confirmation.room} · {confirmation.guests} guest{confirmation.guests > 1 ? "s" : ""} · {confirmation.checkin} to {confirmation.checkout}<br/>Estimated room total: {currency(confirmation.total)}. We will contact you to confirm availability.</div>}</div>
  <aside className="info-panel"><h3>A stay worth looking forward to</h3><p>Everything you need to make your visit feel effortless, from the moment you arrive.</p><div className="info-item"><CalendarDays size={21}/><div><strong>Flexible planning</strong><span>Explore your dates and find the room that fits.</span></div></div><div className="info-item"><ShieldCheck size={21}/><div><strong>Clear room rates</strong><span>Room prices are shown per night in Indian rupees.</span></div></div><div className="info-item"><Clock3 size={21}/><div><strong>Need a hand?</strong><span>Visit our contact page with any questions about your stay.</span></div></div></aside></div></section></>;
}

function BookingPage() { return <BookingSection/>; }
