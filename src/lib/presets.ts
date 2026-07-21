import { buildWhatsappUrl } from "./whatsapp";

export interface PresetPackage {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}

export const PRESET_PACKAGES: PresetPackage[] = [
  {
    id: "economy",
    name: "Economy Package",
    tag: "Simple & Affordable",
    blurb: "All the basics, done right — for pilgrims with a simple budget.",
    features: [
      "Visa Processing",
      "Flight Ticket",
      "Airport Pickup",
      "Makkah Accommodation — 1 Star",
      "Makkah Ziyara",
      "Madeena Accommodation — 1 Star",
      "Madeena Ziyara",
      "Airport Drop-off",
    ],
  },
  {
    id: "comfort",
    name: "Comfort Package",
    tag: "Balanced Choice",
    blurb: "A comfortable choice — good hotels and guided visits, without paying for extras.",
    features: [
      "Visa Processing",
      "Flight Ticket",
      "Airport Pickup",
      "Makkah Accommodation — 4 Star",
      "Makkah Ziyara — Guided",
      "Madeena Accommodation — 4 Star",
      "Madeena Ziyara — Guided",
      "Airport Drop-off",
    ],
    featured: true,
  },
  {
    id: "elite-5-star",
    name: "Elite 5-Star Package",
    tag: "Top Comfort",
    blurb: "Full 5-star comfort, close to the Haram in both cities, from start to end.",
    features: [
      "Visa Processing",
      "Flight Ticket (Business Available)",
      "Airport Pickup",
      "Makkah Accommodation — 5 Star, Haram View",
      "Makkah Ziyara — Private Guided",
      "Madeena Accommodation — 5 Star",
      "Madeena Ziyara — Private Guided",
      "Airport Drop-off",
    ],
  },
];

export function presetWhatsappMessage(preset: PresetPackage): string {
  return `Bismillah. Assalamu Alaikum Al Wafd Team, I am interested in booking your preset '${preset.name}'. Please share the details and availability.`;
}

export function presetWhatsappUrl(preset: PresetPackage): string {
  return buildWhatsappUrl(presetWhatsappMessage(preset));
}
