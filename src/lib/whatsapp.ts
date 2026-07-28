import type { Lang } from "./i18n";

export const WHATSAPP_NUMBER = "966548609600";

export type RoomTier = "None" | "1 Star" | "2 Star" | "3 Star" | "4 Star" | "5 Star";
export type TransportMode = "None" | "Train" | "Car";

export interface CustomSelection {
  individuals: number;
  nights: number;
  visa: boolean;
  ticket: boolean;
  flightFrom: string;
  flightTo: string;
  airportPickup: boolean;
  airportPickupLocation: string;
  makkahRoom: RoomTier;
  makkahCheckIn: string;
  makkahCheckOut: string;
  makkahZiyara: boolean;
  intercityTransport: TransportMode;
  madeenaRoom: RoomTier;
  madeenaCheckIn: string;
  madeenaCheckOut: string;
  madeenaZiyara: boolean;
  airportDropoff: boolean;
  airportDropoffLocation: string;
  comments: string;
}

export const defaultSelection: CustomSelection = {
  individuals: 1,
  nights: 1,
  visa: false,
  ticket: false,
  flightFrom: "",
  flightTo: "",
  airportPickup: false,
  airportPickupLocation: "",
  makkahRoom: "None",
  makkahCheckIn: "",
  makkahCheckOut: "",
  makkahZiyara: false,
  intercityTransport: "None",
  madeenaRoom: "None",
  madeenaCheckIn: "",
  madeenaCheckOut: "",
  madeenaZiyara: false,
  airportDropoff: false,
  airportDropoffLocation: "",
  comments: "",
};

const ROOM_LABEL_ML: Record<RoomTier, string> = {
  None: "ഒന്നുമില്ല",
  "1 Star": "1 സ്റ്റാർ",
  "2 Star": "2 സ്റ്റാർ",
  "3 Star": "3 സ്റ്റാർ",
  "4 Star": "4 സ്റ്റാർ",
  "5 Star": "5 സ്റ്റാർ",
};

const TRANSPORT_LABEL_ML: Record<TransportMode, string> = {
  None: "ഒന്നുമില്ല",
  Train: "ട്രെയിൻ",
  Car: "കാർ",
};

function roomLabel(tier: RoomTier, lang: Lang): string {
  return lang === "ml" ? ROOM_LABEL_ML[tier] : tier;
}

function transportLabel(mode: TransportMode, lang: Lang): string {
  return lang === "ml" ? TRANSPORT_LABEL_ML[mode] : mode;
}

function yn(v: boolean, lang: Lang): string {
  if (lang === "ml") return v ? "ഉവ്വ്" : "ഇല്ല";
  return v ? "Yes" : "No";
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function customPackageMessage(s: CustomSelection, lang: Lang): string {
  if (lang === "ml") {
    const lines: string[] = [
      `വ്യക്തികളുടെ എണ്ണം: ${s.individuals}`,
      `രാത്രികളുടെ എണ്ണം: ${s.nights}`,
      `വിസ: ${yn(s.visa, lang)}`,
      `ടിക്കറ്റ്: ${yn(s.ticket, lang)}`,
    ];
    if (s.ticket && s.flightFrom) lines.push(`ഫ്ലൈറ്റ് എവിടെ നിന്ന്: ${s.flightFrom}`);
    if (s.ticket && s.flightTo) lines.push(`ഫ്ലൈറ്റ് എവിടേക്ക്: ${s.flightTo}`);
    lines.push(`എയർപോർട്ട് പിക്കപ്പ്: ${yn(s.airportPickup, lang)}`);
    if (s.airportPickup && s.airportPickupLocation) lines.push(`പിക്കപ്പ് എയർപോർട്ട്: ${s.airportPickupLocation}`);
    lines.push(`മക്ക റൂം: ${roomLabel(s.makkahRoom, lang)}`);
    if (s.makkahRoom !== "None" && s.makkahCheckIn) lines.push(`മക്ക ചെക്ക്-ഇൻ: ${formatDate(s.makkahCheckIn)}`);
    if (s.makkahRoom !== "None" && s.makkahCheckOut) lines.push(`മക്ക ചെക്ക്-ഔട്ട്: ${formatDate(s.makkahCheckOut)}`);
    lines.push(`മക്ക സിയാറ: ${yn(s.makkahZiyara, lang)}`);
    if (s.intercityTransport !== "None") lines.push(`മക്ക ⇄ മദീന യാത്ര: ${transportLabel(s.intercityTransport, lang)}`);
    lines.push(`മദീന റൂം: ${roomLabel(s.madeenaRoom, lang)}`);
    if (s.madeenaRoom !== "None" && s.madeenaCheckIn) lines.push(`മദീന ചെക്ക്-ഇൻ: ${formatDate(s.madeenaCheckIn)}`);
    if (s.madeenaRoom !== "None" && s.madeenaCheckOut) lines.push(`മദീന ചെക്ക്-ഔട്ട്: ${formatDate(s.madeenaCheckOut)}`);
    lines.push(`മദീന സിയാറ: ${yn(s.madeenaZiyara, lang)}`);
    lines.push(`എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്: ${yn(s.airportDropoff, lang)}`);
    if (s.airportDropoff && s.airportDropoffLocation) lines.push(`ഡ്രോപ്പ്-ഓഫ് എയർപോർട്ട്: ${s.airportDropoffLocation}`);
    if (s.comments.trim()) lines.push(`കൂടുതൽ ആവശ്യങ്ങൾ: ${s.comments.trim()}`);

    return (
      `ബിസ്മില്ലാഹ്. അസ്സലാമു അലൈക്കും അൽ വഫ്ദ് ടീം, താഴെ പറയുന്ന ആവശ്യങ്ങളോടെ ഒരു കസ്റ്റം പാക്കേജിനെക്കുറിച്ച് അന്വേഷിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു: \n` +
      lines.map((l) => `- ${l}`).join(" \n") +
      `. ദയവായി ഒരു ക്വോട്ട് നൽകുക.`
    );
  }

  const lines: string[] = [
    `Number of Individuals: ${s.individuals}`,
    `Number of Nights: ${s.nights}`,
    `Visa: ${yn(s.visa, lang)}`,
    `Ticket: ${yn(s.ticket, lang)}`,
  ];
  if (s.ticket && s.flightFrom) lines.push(`Flight From: ${s.flightFrom}`);
  if (s.ticket && s.flightTo) lines.push(`Flight To: ${s.flightTo}`);
  lines.push(`Airport Pickup: ${yn(s.airportPickup, lang)}`);
  if (s.airportPickup && s.airportPickupLocation) lines.push(`Pickup Airport: ${s.airportPickupLocation}`);
  lines.push(`Makkah Rooms: ${roomLabel(s.makkahRoom, lang)}`);
  if (s.makkahRoom !== "None" && s.makkahCheckIn) lines.push(`Makkah Check-in: ${formatDate(s.makkahCheckIn)}`);
  if (s.makkahRoom !== "None" && s.makkahCheckOut) lines.push(`Makkah Check-out: ${formatDate(s.makkahCheckOut)}`);
  lines.push(`Makkah Ziyara: ${yn(s.makkahZiyara, lang)}`);
  if (s.intercityTransport !== "None") lines.push(`Makkah ⇄ Madeenah Transport: ${transportLabel(s.intercityTransport, lang)}`);
  lines.push(`Madeena Rooms: ${roomLabel(s.madeenaRoom, lang)}`);
  if (s.madeenaRoom !== "None" && s.madeenaCheckIn) lines.push(`Madeena Check-in: ${formatDate(s.madeenaCheckIn)}`);
  if (s.madeenaRoom !== "None" && s.madeenaCheckOut) lines.push(`Madeena Check-out: ${formatDate(s.madeenaCheckOut)}`);
  lines.push(`Madeena Ziyara: ${yn(s.madeenaZiyara, lang)}`);
  lines.push(`Airport Drop-off: ${yn(s.airportDropoff, lang)}`);
  if (s.airportDropoff && s.airportDropoffLocation) lines.push(`Drop-off Airport: ${s.airportDropoffLocation}`);
  if (s.comments.trim()) lines.push(`Additional Requirements: ${s.comments.trim()}`);

  return (
    `Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about a customized package with the following requirements: \n` +
    lines.map((l) => `- ${l}`).join(" \n") +
    `. Please provide a quote.`
  );
}

export function customPackageWhatsappUrl(s: CustomSelection, lang: Lang): string {
  return buildWhatsappUrl(customPackageMessage(s, lang));
}

/** Only the services actually selected, in plain English, for the admin order record. */
export function customSelectionToOrderDetails(s: CustomSelection): { label: string }[] {
  const lines: { label: string }[] = [];
  if (s.visa) lines.push({ label: "Visa Processing" });
  if (s.ticket) {
    const route = [s.flightFrom, s.flightTo].filter(Boolean).join(" → ");
    lines.push({ label: route ? `Flight Ticket (${route})` : "Flight Ticket" });
  }
  if (s.airportPickup) {
    lines.push({ label: `Airport Pickup${s.airportPickupLocation ? ` (${s.airportPickupLocation})` : ""}` });
  }
  if (s.makkahRoom !== "None") {
    const dates = [s.makkahCheckIn, s.makkahCheckOut].filter(Boolean).map(formatDate).join(" – ");
    lines.push({ label: `Makkah Accommodation — ${s.makkahRoom}${dates ? ` (${dates})` : ""}` });
  }
  if (s.makkahZiyara) lines.push({ label: "Makkah Ziyara" });
  if (s.intercityTransport !== "None") {
    lines.push({ label: `Makkah ⇄ Madeenah Transport — ${s.intercityTransport}` });
  }
  if (s.madeenaRoom !== "None") {
    const dates = [s.madeenaCheckIn, s.madeenaCheckOut].filter(Boolean).map(formatDate).join(" – ");
    lines.push({ label: `Madeena Accommodation — ${s.madeenaRoom}${dates ? ` (${dates})` : ""}` });
  }
  if (s.madeenaZiyara) lines.push({ label: "Madeena Ziyara" });
  if (s.airportDropoff) {
    lines.push({ label: `Airport Drop-off${s.airportDropoffLocation ? ` (${s.airportDropoffLocation})` : ""}` });
  }
  if (s.comments.trim()) lines.push({ label: `Additional Requirements: ${s.comments.trim()}` });
  return lines;
}

export function generalEnquiryWhatsappUrl(lang: Lang): string {
  const message =
    lang === "ml"
      ? "ബിസ്മില്ലാഹ്. അസ്സലാമു അലൈക്കും അൽ വഫ്ദ് ടീം, നിങ്ങളുടെ ഉംറ പാക്കേജുകളെക്കുറിച്ച് അന്വേഷിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു. കൂടുതൽ വിവരങ്ങൾ പങ്കുവെക്കുക."
      : "Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about your Umrah packages. Please share more details.";
  return buildWhatsappUrl(message);
}

export function contactFormWhatsappUrl(
  fields: { name: string; phone: string; message: string },
  lang: Lang
): string {
  const message =
    lang === "ml"
      ? `ബിസ്മില്ലാഹ്. അസ്സലാമു അലൈക്കും അൽ വഫ്ദ് ടീം, എന്റെ പേര് ${fields.name} (${fields.phone}). \n\n${fields.message}`
      : `Bismillah. Assalamu Alaikum Al Wafd Team, my name is ${fields.name} (${fields.phone}). \n\n${fields.message}`;
  return buildWhatsappUrl(message);
}
