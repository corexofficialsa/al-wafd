import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import Toggle from "../components/Toggle";
import RoomSelect from "../components/RoomSelect";
import QuantityStepper from "../components/QuantityStepper";
import AirportAutocomplete from "../components/AirportAutocomplete";
import TransportSelect from "../components/TransportSelect";
import {
  customPackageWhatsappUrl,
  customSelectionToOrderDetails,
  defaultSelection,
  type CustomSelection,
} from "../lib/whatsapp";
import { useT, useLanguage } from "../lib/i18n";
import { useEnquireFlow } from "../lib/enquireFlow";

function selectionCount(s: CustomSelection): number {
  let n = 0;
  if (s.visa) n++;
  if (s.ticket) n++;
  if (s.airportPickup) n++;
  if (s.makkahRoom !== "None") n++;
  if (s.makkahZiyara) n++;
  if (s.intercityTransport !== "None") n++;
  if (s.madeenaRoom !== "None") n++;
  if (s.madeenaZiyara) n++;
  if (s.airportDropoff) n++;
  return n;
}

/** A conditional AnimatePresence reveal without height/overflow-hidden, so
 * dropdowns (like the airport autocomplete) inside can escape visually. */
function FieldReveal({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pb-5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PackageBuilder() {
  const [selection, setSelection] = useState<CustomSelection>(defaultSelection);
  const t = useT();
  const { lang } = useLanguage();
  const { requestEnquire } = useEnquireFlow();

  const set = <K extends keyof CustomSelection>(key: K, value: CustomSelection[K]) =>
    setSelection((prev) => ({ ...prev, [key]: value }));

  const count = useMemo(() => selectionCount(selection), [selection]);
  const whatsappUrl = useMemo(() => customPackageWhatsappUrl(selection, lang), [selection, lang]);

  const servicesLabel =
    count === 0
      ? t({ en: "Nothing selected yet", ml: "ഒന്നും തിരഞ്ഞെടുത്തിട്ടില്ല" })
      : lang === "ml"
        ? `${count} സേവന${count > 1 ? "ങ്ങൾ" : "ം"} തിരഞ്ഞെടുത്തു`
        : `${count} service${count > 1 ? "s" : ""} selected`;

  const individualsLabel =
    lang === "ml"
      ? `${selection.individuals} ${selection.individuals > 1 ? "വ്യക്തികൾ" : "വ്യക്തി"}`
      : `${selection.individuals} ${selection.individuals > 1 ? "individuals" : "individual"}`;

  const nightsLabel =
    lang === "ml"
      ? `${selection.nights} ${selection.nights > 1 ? "രാത്രികൾ" : "രാത്രി"}`
      : `${selection.nights} ${selection.nights > 1 ? "nights" : "night"}`;

  return (
    <div>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">
            {t({ en: "Package Builder", ml: "പാക്കേജ് ബിൽഡർ" })}
          </p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            {t({ en: "Build Your Own Package", ml: "സ്വന്തമായി പാക്കേജ് തയ്യാറാക്കൂ" })}
          </h1>
          <OrnamentDivider className="mt-10" />
          <p className="mt-8 text-ink/55 font-normal max-w-xl mx-auto leading-relaxed">
            {t({
              en: "Turn on what you need. We'll send your choices straight to our team on WhatsApp.",
              ml: "നിങ്ങൾക്ക് വേണ്ടത് ഓണാക്കൂ. നിങ്ങളുടെ തിരഞ്ഞെടുപ്പുകൾ ഞങ്ങൾ നേരിട്ട് വാട്സാപ്പ് വഴി ടീമിന് അയക്കും.",
            })}
          </p>
        </Reveal>
      </section>

      <section className="pb-40 md:pb-48 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-16 pl-20 sm:pl-0">
          <Reveal className="md:col-span-2">
            <div className="border-b border-maroon/15 divide-y divide-maroon/10">
              <QuantityStepper
                value={selection.individuals}
                onChange={(v) => set("individuals", v)}
                label={t({ en: "Number of Individuals", ml: "വ്യക്തികളുടെ എണ്ണം" })}
                description={t({ en: "How many people is this for?", ml: "എത്ര പേർക്കാണ് ഇത്?" })}
              />
              <QuantityStepper
                value={selection.nights}
                onChange={(v) => set("nights", v)}
                label={t({ en: "Number of Nights", ml: "രാത്രികളുടെ എണ്ണം" })}
                description={t({ en: "How many nights do you need in total?", ml: "മൊത്തം എത്ര രാത്രി വേണം?" })}
                max={60}
              />
              <Toggle
                checked={selection.visa}
                onChange={(v) => set("visa", v)}
                label={t({ en: "Visa Processing", ml: "വിസ പ്രോസസ്സിംഗ്" })}
                description={t({ en: "We handle all the visa paperwork for you.", ml: "വിസ കടലാസുകൾ എല്ലാം ഞങ്ങൾ കൈകാര്യം ചെയ്യും." })}
              />
              <Toggle
                checked={selection.ticket}
                onChange={(v) => set("ticket", v)}
                label={t({ en: "Flight Ticket", ml: "ഫ്ലൈറ്റ് ടിക്കറ്റ്" })}
                description={t({ en: "We book your flight there and back.", ml: "പോക്കും വരവും ഫ്ലൈറ്റ് ഞങ്ങൾ ബുക്ക് ചെയ്യും." })}
              />
              <FieldReveal show={selection.ticket}>
                <div className="grid grid-cols-2 gap-4">
                  <AirportAutocomplete
                    value={selection.flightFrom}
                    onChange={(v) => set("flightFrom", v)}
                    label={t({ en: "From Airport", ml: "ഏത് എയർപോർട്ടിൽ നിന്ന്" })}
                    placeholder={t({ en: "Search city or airport code", ml: "നഗരം അല്ലെങ്കിൽ കോഡ് തിരയൂ" })}
                  />
                  <AirportAutocomplete
                    value={selection.flightTo}
                    onChange={(v) => set("flightTo", v)}
                    label={t({ en: "To Airport", ml: "ഏത് എയർപോർട്ടിലേക്ക്" })}
                    placeholder={t({ en: "Search city or airport code", ml: "നഗരം അല്ലെങ്കിൽ കോഡ് തിരയൂ" })}
                  />
                </div>
              </FieldReveal>

              <Toggle
                checked={selection.airportPickup}
                onChange={(v) => set("airportPickup", v)}
                label={t({ en: "Airport Pickup", ml: "എയർപോർട്ട് പിക്കപ്പ്" })}
                description={t({
                  en: "Met on arrival and driven straight to your hotel.",
                  ml: "എത്തുമ്പോൾ സ്വീകരിച്ച് നേരിട്ട് ഹോട്ടലിലേക്ക് കൊണ്ടുപോകും.",
                })}
              />
              <FieldReveal show={selection.airportPickup}>
                <AirportAutocomplete
                  value={selection.airportPickupLocation}
                  onChange={(v) => set("airportPickupLocation", v)}
                  label={t({ en: "Pickup Airport", ml: "പിക്കപ്പ് എയർപോർട്ട്" })}
                  placeholder={t({ en: "Search city or airport code", ml: "നഗരം അല്ലെങ്കിൽ കോഡ് തിരയൂ" })}
                />
              </FieldReveal>

              <Toggle
                checked={selection.airportDropoff}
                onChange={(v) => set("airportDropoff", v)}
                label={t({ en: "Airport Drop-off", ml: "എയർപോർട്ട് ഡ്രോപ്പ്-ഓഫ്" })}
                description={t({
                  en: "Driven to the airport ahead of your departure.",
                  ml: "മടക്കയാത്രക്ക് മുമ്പ് എയർപോർട്ടിലേക്ക് കൊണ്ടുപോകും.",
                })}
              />
              <FieldReveal show={selection.airportDropoff}>
                <AirportAutocomplete
                  value={selection.airportDropoffLocation}
                  onChange={(v) => set("airportDropoffLocation", v)}
                  label={t({ en: "Drop-off Airport", ml: "ഡ്രോപ്പ്-ഓഫ് എയർപോർട്ട്" })}
                  placeholder={t({ en: "Search city or airport code", ml: "നഗരം അല്ലെങ്കിൽ കോഡ് തിരയൂ" })}
                />
              </FieldReveal>

              <TransportSelect
                value={selection.intercityTransport}
                onChange={(v) => set("intercityTransport", v)}
                label={t({ en: "Makkah ⇄ Madeenah Transport", ml: "മക്ക ⇄ മദീന യാത്ര" })}
                description={t({
                  en: "How would you like to travel between the two holy cities?",
                  ml: "രണ്ട് പുണ്യ നഗരങ്ങൾക്കിടയിൽ എങ്ങനെ യാത്ര ചെയ്യണം?",
                })}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mt-10 mb-1">
              {t({ en: "Makkah", ml: "മക്ക" })}
            </h3>
            <div className="divide-y divide-maroon/10">
              <RoomSelect
                value={selection.makkahRoom}
                onChange={(v) => set("makkahRoom", v)}
                label={t({ en: "Makkah Accommodation", ml: "മക്ക താമസം" })}
                description={t({ en: "Choose your hotel rating near the Haram.", ml: "ഹറമിന് അടുത്തുള്ള ഹോട്ടൽ റേറ്റിംഗ് തിരഞ്ഞെടുക്കൂ." })}
                checkIn={selection.makkahCheckIn}
                onCheckInChange={(v) => set("makkahCheckIn", v)}
                checkOut={selection.makkahCheckOut}
                onCheckOutChange={(v) => set("makkahCheckOut", v)}
              />
              <Toggle
                checked={selection.makkahZiyara}
                onChange={(v) => set("makkahZiyara", v)}
                label={t({ en: "Makkah Ziyara", ml: "മക്ക സിയാറ" })}
                description={t({ en: "Guided tour of the holy sites in Makkah.", ml: "മക്കയിലെ പുണ്യസ്ഥലങ്ങളിലേക്കുള്ള ഗൈഡഡ് സന്ദർശനം." })}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mt-10 mb-1">
              {t({ en: "Madeenah", ml: "മദീന" })}
            </h3>
            <div className="divide-y divide-maroon/10">
              <RoomSelect
                value={selection.madeenaRoom}
                onChange={(v) => set("madeenaRoom", v)}
                label={t({ en: "Madeena Accommodation", ml: "മദീന താമസം" })}
                description={t({
                  en: "Choose your hotel rating near the Prophet's Mosque.",
                  ml: "മസ്ജിദുന്നബവിക്ക് അടുത്തുള്ള ഹോട്ടൽ റേറ്റിംഗ് തിരഞ്ഞെടുക്കൂ.",
                })}
                checkIn={selection.madeenaCheckIn}
                onCheckInChange={(v) => set("madeenaCheckIn", v)}
                checkOut={selection.madeenaCheckOut}
                onCheckOutChange={(v) => set("madeenaCheckOut", v)}
              />
              <Toggle
                checked={selection.madeenaZiyara}
                onChange={(v) => set("madeenaZiyara", v)}
                label={t({ en: "Madeena Ziyara", ml: "മദീന സിയാറ" })}
                description={t({ en: "Guided tour of the holy sites in Madeenah.", ml: "മദീനയിലെ പുണ്യസ്ഥലങ്ങളിലേക്കുള്ള ഗൈഡഡ് സന്ദർശനം." })}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <div className="pt-10">
              <label className="block text-base md:text-lg font-serif font-medium text-maroon mb-1">
                {t({ en: "Any Requirements?", ml: "എന്തെങ്കിലും പ്രത്യേക ആവശ്യങ്ങൾ?" })}
              </label>
              <p className="text-xs md:text-sm font-normal text-ink/45 mb-4">
                {t({
                  en: "Tell us anything else we should know — wheelchair access, dietary needs, room preferences, etc.",
                  ml: "വീൽചെയർ ആവശ്യമുണ്ടോ, ഭക്ഷണ നിയന്ത്രണങ്ങൾ, റൂം മുൻഗണനകൾ പോലുള്ളവ ഉണ്ടെങ്കിൽ പറയൂ.",
                })}
              </p>
              <textarea
                value={selection.comments}
                onChange={(e) => set("comments", e.target.value)}
                rows={3}
                placeholder={t({ en: "Optional — write any special requests here", ml: "ഐച്ഛികം — പ്രത്യേക ആവശ്യങ്ങൾ ഇവിടെ എഴുതൂ" })}
                className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-4 py-3 text-sm outline-none transition-colors resize-none"
              />
            </div>
          </Reveal>
        </div>

        {/* Sticky summary / CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <motion.div
            layout
            className="bg-maroon text-cream p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-[11px] tracking-widest-lg uppercase text-gold/80 mb-2">
                {servicesLabel}
                {" · "}
                {individualsLabel}
                {" · "}
                {nightsLabel}
              </p>
              <p className="font-serif font-medium text-xl md:text-2xl text-cream text-balance">
                {t({ en: "Send your choices to our team.", ml: "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പുകൾ ഞങ്ങളുടെ ടീമിന് അയക്കൂ." })}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                requestEnquire({
                  source: "custom-builder",
                  whatsappUrl,
                  quantity: selection.individuals,
                  orderDetails: customSelectionToOrderDetails(selection),
                })
              }
              className="shrink-0 px-10 py-4 bg-gold text-maroon-dark text-sm tracking-widest-lg uppercase font-sans font-medium hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              {t({ en: "Enquire Now", ml: "അന്വേഷിക്കൂ" })}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
