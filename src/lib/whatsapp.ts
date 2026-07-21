export const WHATSAPP_NUMBER = "966548609600";

export type RoomTier = "None" | "1 Star" | "2 Star" | "3 Star" | "4 Star" | "5 Star";

export interface CustomSelection {
  quantity: number;
  visa: boolean;
  ticket: boolean;
  airportPickup: boolean;
  makkahRoom: RoomTier;
  makkahZiyara: boolean;
  madeenaRoom: RoomTier;
  madeenaZiyara: boolean;
  airportDropoff: boolean;
}

export const defaultSelection: CustomSelection = {
  quantity: 1,
  visa: false,
  ticket: false,
  airportPickup: false,
  makkahRoom: "None",
  makkahZiyara: false,
  madeenaRoom: "None",
  madeenaZiyara: false,
  airportDropoff: false,
};

const yn = (v: boolean) => (v ? "Yes" : "No");

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function customPackageMessage(s: CustomSelection): string {
  return (
    `Bismillah. Assalamu Alaikum Al Wafd Team, I would like to enquire about a customized package with the following requirements: \n` +
    `- Number of Packages: ${s.quantity} \n` +
    `- Visa: ${yn(s.visa)} \n` +
    `- Ticket: ${yn(s.ticket)} \n` +
    `- Airport Pickup: ${yn(s.airportPickup)} \n` +
    `- Makkah Rooms: ${s.makkahRoom} \n` +
    `- Makkah Ziyara: ${yn(s.makkahZiyara)} \n` +
    `- Madeena Rooms: ${s.madeenaRoom} \n` +
    `- Madeena Ziyara: ${yn(s.madeenaZiyara)} \n` +
    `- Airport Drop-off: ${yn(s.airportDropoff)}. Please provide a quote.`
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
