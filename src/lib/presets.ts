import { buildWhatsappUrl } from "./whatsapp";
import type { Bi, Lang } from "./i18n";

export interface PresetPackage {
  id: string;
  name: Bi;
  tag: Bi;
  blurb: Bi;
  features: Bi[];
  featured?: boolean;
}

export const PRESET_PACKAGES: PresetPackage[] = [
  {
    id: "economy",
    name: { en: "Economy Package", ml: "ഇക്കണോമി പാക്കേജ്" },
    tag: { en: "Simple & Affordable", ml: "ലളിതവും ചെലവ് കുറഞ്ഞതും" },
    blurb: {
      en: "All the basics, done right — for pilgrims with a simple budget.",
      ml: "എല്ലാ അടിസ്ഥാന കാര്യങ്ങളും കൃത്യമായി — കുറഞ്ഞ ബജറ്റുള്ള തീർത്ഥാടകർക്ക്.",
    },
    features: [
      { en: "Visa Processing", ml: "വിസ പ്രോസസ്സിംഗ്" },
      { en: "Flight Ticket", ml: "ഫ്ലൈറ്റ് ടിക്കറ്റ്" },
      { en: "Airport Pickup", ml: "എയർപോർട്ട് പിക്കപ്പ്" },
      { en: "Makkah Accommodation — 1 Star", ml: "മക്ക താമസം — 1 സ്റ്റാർ" },
      { en: "Makkah Ziyara", ml: "മക്ക സിയാറ" },
      { en: "Madeena Accommodation — 1 Star", ml: "മദീന താമസം — 1 സ്റ്റാർ" },
      { en: "Madeena Ziyara", ml: "മദീന സിയാറ" },
      { en: "Airport Drop-off", ml: "എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്" },
    ],
  },
  {
    id: "comfort",
    name: { en: "Comfort Package", ml: "കംഫർട്ട് പാക്കേജ്" },
    tag: { en: "Balanced Choice", ml: "സമതുലിതമായ തിരഞ്ഞെടുപ്പ്" },
    blurb: {
      en: "A comfortable choice — good hotels and guided visits, without paying for extras.",
      ml: "സൗകര്യപ്രദമായ തിരഞ്ഞെടുപ്പ് — നല്ല ഹോട്ടലുകളും ഗൈഡഡ് സന്ദർശനങ്ങളും, അധിക ചെലവില്ലാതെ.",
    },
    features: [
      { en: "Visa Processing", ml: "വിസ പ്രോസസ്സിംഗ്" },
      { en: "Flight Ticket", ml: "ഫ്ലൈറ്റ് ടിക്കറ്റ്" },
      { en: "Airport Pickup", ml: "എയർപോർട്ട് പിക്കപ്പ്" },
      { en: "Makkah Accommodation — 4 Star", ml: "മക്ക താമസം — 4 സ്റ്റാർ" },
      { en: "Makkah Ziyara — Guided", ml: "മക്ക സിയാറ — ഗൈഡഡ്" },
      { en: "Madeena Accommodation — 4 Star", ml: "മദീന താമസം — 4 സ്റ്റാർ" },
      { en: "Madeena Ziyara — Guided", ml: "മദീന സിയാറ — ഗൈഡഡ്" },
      { en: "Airport Drop-off", ml: "എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്" },
    ],
    featured: true,
  },
  {
    id: "elite-5-star",
    name: { en: "Elite 5-Star Package", ml: "എലൈറ്റ് 5-സ്റ്റാർ പാക്കേജ്" },
    tag: { en: "Top Comfort", ml: "ഏറ്റവും മികച്ച സൗകര്യം" },
    blurb: {
      en: "Full 5-star comfort, close to the Haram in both cities, from start to end.",
      ml: "പൂർണ്ണ 5-സ്റ്റാർ സൗകര്യം, രണ്ട് നഗരങ്ങളിലും ഹറമിന് അടുത്ത്, തുടക്കം മുതൽ ഒടുക്കം വരെ.",
    },
    features: [
      { en: "Visa Processing", ml: "വിസ പ്രോസസ്സിംഗ്" },
      { en: "Flight Ticket (Business Available)", ml: "ഫ്ലൈറ്റ് ടിക്കറ്റ് (ബിസിനസ് ലഭ്യമാണ്)" },
      { en: "Airport Pickup", ml: "എയർപോർട്ട് പിക്കപ്പ്" },
      { en: "Makkah Accommodation — 5 Star, Haram View", ml: "മക്ക താമസം — 5 സ്റ്റാർ, ഹറം കാഴ്ച" },
      { en: "Makkah Ziyara — Private Guided", ml: "മക്ക സിയാറ — സ്വകാര്യ ഗൈഡഡ്" },
      { en: "Madeena Accommodation — 5 Star", ml: "മദീന താമസം — 5 സ്റ്റാർ" },
      { en: "Madeena Ziyara — Private Guided", ml: "മദീന സിയാറ — സ്വകാര്യ ഗൈഡഡ്" },
      { en: "Airport Drop-off", ml: "എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്" },
    ],
  },
];

export function presetWhatsappMessage(preset: PresetPackage, lang: Lang): string {
  if (lang === "ml") {
    return `ബിസ്മില്ലാഹ്. അസ്സലാമു അലൈക്കും അൽ വഫ്ദ് ടീം, നിങ്ങളുടെ '${preset.name.ml}' പാക്കേജ് ബുക്ക് ചെയ്യാൻ എനിക്ക് താൽപ്പര്യമുണ്ട്. വിശദാംശങ്ങളും ലഭ്യതയും അറിയിക്കുക.`;
  }
  return `Bismillah. Assalamu Alaikum Al Wafd Team, I am interested in booking your preset '${preset.name.en}'. Please share the details and availability.`;
}

export function presetWhatsappUrl(preset: PresetPackage, lang: Lang): string {
  return buildWhatsappUrl(presetWhatsappMessage(preset, lang));
}
