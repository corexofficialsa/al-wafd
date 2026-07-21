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

const yn = (v: boolean) => (v ? "Yes" : "No");

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function customPackageMessage(s: CustomSelection): string {
  const lines: string[] = [
    `Number of Packages: ${s.quantity}`,
    `Visa: ${yn(s.visa)}`,
    `Ticket: ${yn(s.ticket)}`,
    `Airport Pickup: ${yn(s.airportPickup)}`,
    `Makkah Rooms: ${s.makkahRoom}`,
  ];
  if (s.makkahRoom !== "None" && s.makkahCheckIn) {
    lines.push(`Makkah Check-in: ${formatDate(s.makkahCheckIn)}`);
  }
  if (s.makkahRoom !== "None" && s.makkahCheckOut) {
    lines.push(`Makkah Check-out: ${formatDate(s.makkahCheckOut)}`);
  }
  lines.push(`Makkah Ziyara: ${yn(s.makkahZiyara)}`);
  lines.push(`Madeena Rooms: ${s.madeenaRoom}`);
  if (s.madeenaRoom !== "None" && s.madeenaCheckIn) {
    lines.push(`Madeena Check-in: ${formatDate(s.madeenaCheckIn)}`);
  }
  if (s.madeenaRoom !== "None" && s.madeenaCheckOut) {
    lines.push(`Madeena Check-out: ${formatDate(s.madeenaCheckOut)}`);
  }
  lines.push(`Madeena Ziyara: ${yn(s.madeenaZiyara)}`);
  lines.push(`Airport Drop-off: ${yn(s.airportDropoff)}`);

  return (
    `Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about a customized package with the following requirements: \n` +
    lines.map((l) => `- ${l}`).join(" \n") +
    `. Please provide a quote.`
  );
}

export function customPackageWhatsappUrl(s: CustomSelection): string {
  return buildWhatsappUrl(customPackageMessage(s));
}

export function generalEnquiryWhatsappUrl(): string {
  return buildWhatsappUrl(
    "Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about your Umrah packages. Please share more details."
  );
}

export function contactFormWhatsappUrl(fields: { name: string; phone: string; message: string }): string {
  const message =
    `Bismillah. Assalamu Alaikum Al Wafd Team, my name is ${fields.name} (${fields.phone}). \n\n${fields.message}`;
  return buildWhatsappUrl(message);
}
