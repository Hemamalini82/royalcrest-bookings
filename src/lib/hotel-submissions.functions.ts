import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(255), phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/), checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), guests: z.number().int().min(1).max(4), room: z.enum(["Deluxe Room", "Premium Room", "Executive Suite", "Royal Suite"]) }).refine(d => d.checkin >= new Date().toISOString().slice(0,10) && d.checkout > d.checkin, "Please check your dates.").refine(d => d.guests <= (d.room === "Royal Suite" ? 4 : d.room === "Executive Suite" ? 3 : 2), "Too many guests for this room.");
const rates: Record<string, number> = { "Deluxe Room": 3999, "Premium Room": 5499, "Executive Suite": 7999, "Royal Suite": 11999 };
const contactSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(255), subject: z.string().trim().min(2).max(120), message: z.string().trim().min(10).max(1000) });

export const submitBooking = createServerFn({ method: "POST" }).inputValidator((input) => bookingSchema.parse(input)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const nights = Math.round((Date.parse(`${data.checkout}T12:00:00Z`) - Date.parse(`${data.checkin}T12:00:00Z`)) / 86400000);
  if (!Number.isFinite(nights) || nights < 1 || nights > 90) throw new Error("Choose a stay between 1 and 90 nights.");
  const total = nights * rates[data.room];
  const { error } = await supabaseAdmin.from("booking_requests").insert({ guest_name: data.name, email: data.email, phone: data.phone, checkin: data.checkin, checkout: data.checkout, guests: data.guests, room_type: data.room, estimated_total: total });
  if (error) throw new Error("We could not save your booking request. Please try again.");
  return { total };
});

export const submitContact = createServerFn({ method: "POST" }).inputValidator((input) => contactSchema.parse(input)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("contact_submissions").insert(data);
  if (error) throw new Error("We could not save your message. Please try again.");
  return { saved: true };
});
