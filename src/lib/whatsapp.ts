import type { Lang } from "./i18n";

export const WHATSAPP_NUMBER = "966548609600";

export type RoomTier = "None" | "1 Star" | "2 Star" | "3 Star" | "4 Star" | "5 Star";

export interface CustomSelection {
  quantity: number;
  visa: boolean;
  ticket: boolean;
  airportPickup: boolean;
  makkahRoom: RoomTier;
  makkahCheckIn: string;
  makkahCheckOut: string;
  makkahZiyara: boolean;
  madeenaRoom: RoomTier;
  madeenaCheckIn: string;
  madeenaCheckOut: string;
  madeenaZiyara: boolean;
  airportDropoff: boolean;
}

export const defaultSelection: CustomSelection = {
  quantity: 1,
  visa: false,
  ticket: false,
  airportPickup: false,
  makkahRoom: "None",
  makkahCheckIn: "",
  makkahCheckOut: "",
  makkahZiyara: false,
  madeenaRoom: "None",
  madeenaCheckIn: "",
  madeenaCheckOut: "",
  madeenaZiyara: false,
  airportDropoff: false,
};

const ROOM_LABEL_ML: Record<RoomTier, string> = {
  None: "ഒന്നുമില്ല",
  "1 Star": "1 സ്റ്റാർ",
  "2 Star": "2 സ്റ്റാർ",
  "3 Star": "3 സ്റ്റാർ",
  "4 Star": "4 സ്റ്റാർ",
  "5 Star": "5 സ്റ്റാർ",
};

function roomLabel(tier: RoomTier, lang: Lang): string {
  return lang === "ml" ? ROOM_LABEL_ML[tier] : tier;
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
      `പാക്കേജുകളുടെ എണ്ണം: ${s.quantity}`,
      `വിസ: ${yn(s.visa, lang)}`,
      `ടിക്കറ്റ്: ${yn(s.ticket, lang)}`,
      `എയർപോർട്ട് പിക്കപ്പ്: ${yn(s.airportPickup, lang)}`,
      `മക്ക റൂം: ${roomLabel(s.makkahRoom, lang)}`,
    ];
    if (s.makkahRoom !== "None" && s.makkahCheckIn) lines.push(`മക്ക ചെക്ക്-ഇൻ: ${formatDate(s.makkahCheckIn)}`);
    if (s.makkahRoom !== "None" && s.makkahCheckOut) lines.push(`മക്ക ചെക്ക്-ഔട്ട്: ${formatDate(s.makkahCheckOut)}`);
    lines.push(`മക്ക സിയാറ: ${yn(s.makkahZiyara, lang)}`);
    lines.push(`മദീന റൂം: ${roomLabel(s.madeenaRoom, lang)}`);
    if (s.madeenaRoom !== "None" && s.madeenaCheckIn) lines.push(`മദീന ചെക്ക്-ഇൻ: ${formatDate(s.madeenaCheckIn)}`);
    if (s.madeenaRoom !== "None" && s.madeenaCheckOut) lines.push(`മദീന ചെക്ക്-ഔട്ട്: ${formatDate(s.madeenaCheckOut)}`);
    lines.push(`മദീന സിയാറ: ${yn(s.madeenaZiyara, lang)}`);
    lines.push(`എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്: ${yn(s.airportDropoff, lang)}`);

    return (
      `ബിസ്മില്ലാഹ്. അസ്സലാമു അലൈക്കും അൽ വഫ്ദ് ടീം, താഴെ പറയുന്ന ആവശ്യങ്ങളോടെ ഒരു കസ്റ്റം പാക്കേജിനെക്കുറിച്ച് അന്വേഷിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു: \n` +
      lines.map((l) => `- ${l}`).join(" \n") +
      `. ദയവായി ഒരു ക്വോട്ട് നൽകുക.`
    );
  }

  const lines: string[] = [
    `Number of Packages: ${s.quantity}`,
    `Visa: ${yn(s.visa, lang)}`,
    `Ticket: ${yn(s.ticket, lang)}`,
    `Airport Pickup: ${yn(s.airportPickup, lang)}`,
    `Makkah Rooms: ${roomLabel(s.makkahRoom, lang)}`,
  ];
  if (s.makkahRoom !== "None" && s.makkahCheckIn) lines.push(`Makkah Check-in: ${formatDate(s.makkahCheckIn)}`);
  if (s.makkahRoom !== "None" && s.makkahCheckOut) lines.push(`Makkah Check-out: ${formatDate(s.makkahCheckOut)}`);
  lines.push(`Makkah Ziyara: ${yn(s.makkahZiyara, lang)}`);
  lines.push(`Madeena Rooms: ${roomLabel(s.madeenaRoom, lang)}`);
  if (s.madeenaRoom !== "None" && s.madeenaCheckIn) lines.push(`Madeena Check-in: ${formatDate(s.madeenaCheckIn)}`);
  if (s.madeenaRoom !== "None" && s.madeenaCheckOut) lines.push(`Madeena Check-out: ${formatDate(s.madeenaCheckOut)}`);
  lines.push(`Madeena Ziyara: ${yn(s.madeenaZiyara, lang)}`);
  lines.push(`Airport Drop-off: ${yn(s.airportDropoff, lang)}`);

  return (
    `Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about a customized package with the following requirements: \n` +
    lines.map((l) => `- ${l}`).join(" \n") +
    `. Please provide a quote.`
  );
}

export function customPackageWhatsappUrl(s: CustomSelection, lang: Lang): string {
  return buildWhatsappUrl(customPackageMessage(s, lang));
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
