import deluxe from "@/assets/deluxe-room.jpg";
import premium from "@/assets/premium-room.jpg";
import executive from "@/assets/executive-suite.jpg";
import royal from "@/assets/royal-suite.jpg";

export const rooms = [
  { name: "Deluxe Room", image: deluxe, price: 3999, size: "32 m²", guests: "2 guests", description: "An inviting retreat with thoughtful details and everything you need to unwind.", amenities: ["King bed", "Free Wi-Fi", "Smart TV", "Air conditioning"] },
  { name: "Premium Room", image: premium, price: 5499, size: "38 m²", guests: "2 guests", description: "A little more room to relax, with refined comforts and beautiful views.", amenities: ["King bed", "City view", "Free Wi-Fi", "Minibar"] },
  { name: "Executive Suite", image: executive, price: 7999, size: "55 m²", guests: "3 guests", description: "Space to work, rest, and make yourself completely at home.", amenities: ["Separate lounge", "King bed", "Work desk", "Breakfast"] },
  { name: "Royal Suite", image: royal, price: 11999, size: "75 m²", guests: "4 guests", description: "Our finest stay, made for moments that deserve something extraordinary.", amenities: ["Private lounge", "Premium bath", "Breakfast", "Room service"] },
] as const;

export const currency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
