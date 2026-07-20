import { buildWhatsappUrl } from "./whatsapp";

export interface PresetPackage {
  id: string;
  name: string;
  tag: string;
  priceSar: number;
  priceUsdApprox: number;
  blurb: string;
  features: string[];
  whatsappMessage: string;
  featured?: boolean;
}

export const PRESET_PACKAGES: PresetPackage[] = [
  {
    id: "essential",
    name: "Essential Package",
    tag: "Modest & Sincere",
    priceSar: 2199,
    priceUsdApprox: 585,
    blurb: "Every essential, handled properly — for the pilgrim who travels with a simple heart and a simple budget.",
    features: [
      "Umrah Visa Processing & Guidance",
      "Economy Return Airfare",
      "Makkah Accommodation: 3-Star Hotel (short shuttle to Haram)",
      "Madeena Accommodation: 3-Star Hotel (walking distance to Prophet's Mosque)",
      "Basic Ground Transport (shared A/C bus)",
      "Standard Makkah & Madeena Ziyara Guidance",
    ],
    whatsappMessage:
      "Bismillah. Assalamu Alaikum Al Wafd Team, I am interested in booking the 'Essential Package' (2,199 SAR). Please provide availability and booking steps.",
  },
  {
    id: "comfort",
    name: "Comfort Package",
    tag: "Balanced & Refined",
    priceSar: 4499,
    priceUsdApprox: 1200,
    blurb: "A comfortable middle path — well-located stays and private Ziyara, without excess.",
    features: [
      "Priority Umrah Visa & Express Processing",
      "Direct Economy / Premium Airfare",
      "Makkah Accommodation: 4-Star Hotel (within 300m of the Haram courtyard)",
      "Madeena Accommodation: 4-Star Hotel (direct central area access)",
      "Private High-Speed Haramain Train Transfers between Makkah & Madeena",
      "Guided Private Ziyara Tours in both Makkah & Madeena",
      "Complimentary Daily Breakfast",
    ],
    whatsappMessage:
      "Bismillah. Assalamu Alaikum Al Wafd Team, I am interested in booking your recommended 'Comfort Package' (4,499 SAR). Please share the complete itinerary and upcoming dates.",
    featured: true,
  },
  {
    id: "royal-executive",
    name: "Royal Executive",
    tag: "The Full Delegation",
    priceSar: 8999,
    priceUsdApprox: 2400,
    blurb: "Uncompromising 5-Star hospitality, moments from the Haram in both cities, start to end.",
    features: [
      "VIP Visa Handling & Dedicated Personal Assistant",
      "Flexible Flight Booking with Preferred Seating",
      "Makkah Accommodation: 5-Star Luxury Hotel (direct Kaaba view)",
      "Madeena Accommodation: 5-Star Luxury Hotel (front row, gate access)",
      "Private Luxury SUV Transport throughout the trip",
      "Exclusive VIP Guided Ziyara with historical experts",
      "Full Board (Breakfast & Dinner) Included",
    ],
    whatsappMessage:
      "Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about the 'Royal Executive 5-Star Package' (8,999 SAR). Please contact me with details for a customized itinerary.",
  },
];

export function presetWhatsappUrl(preset: PresetPackage): string {
  return buildWhatsappUrl(preset.whatsappMessage);
}

export function formatSar(amount: number): string {
  return `${amount.toLocaleString("en-US")} SAR`;
}
