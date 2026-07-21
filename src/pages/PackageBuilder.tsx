import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import Toggle from "../components/Toggle";
import RoomSelect from "../components/RoomSelect";
import QuantityStepper from "../components/QuantityStepper";
import {
  customPackageWhatsappUrl,
  defaultSelection,
  type CustomSelection,
} from "../lib/whatsapp";

function selectionCount(s: CustomSelection): number {
  let n = 0;
  if (s.visa) n++;
  if (s.ticket) n++;
  if (s.airportPickup) n++;
  if (s.makkahRoom !== "None") n++;
  if (s.makkahZiyara) n++;
  if (s.madeenaRoom !== "None") n++;
  if (s.madeenaZiyara) n++;
  if (s.airportDropoff) n++;
  return n;
}

export default function PackageBuilder() {
  const [selection, setSelection] = useState<CustomSelection>(defaultSelection);

  const set = <K extends keyof CustomSelection>(key: K, value: CustomSelection[K]) =>
    setSelection((prev) => ({ ...prev, [key]: value }));

  const count = useMemo(() => selectionCount(selection), [selection]);
  const whatsappUrl = useMemo(() => customPackageWhatsappUrl(selection), [selection]);

  return (
    <div>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">Package Builder</p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            Build Your Own Package
          </h1>
          <OrnamentDivider className="mt-10" />
          <p className="mt-8 text-ink/55 font-light max-w-xl mx-auto leading-relaxed">
            Turn on what you need. We'll send your choices straight to our
            team on WhatsApp.
          </p>
        </Reveal>
      </section>

      <section className="pb-40 md:pb-48 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-16 pl-20 sm:pl-0">
          <Reveal className="md:col-span-2">
            <div className="border-b border-maroon/15 divide-y divide-maroon/10">
              <QuantityStepper
                value={selection.quantity}
                onChange={(v) => set("quantity", v)}
                label="Number of Packages"
                description="How many people is this for?"
              />
              <Toggle
                checked={selection.visa}
                onChange={(v) => set("visa", v)}
                label="Visa Processing"
                description="We handle all the visa paperwork for you."
              />
              <Toggle
                checked={selection.ticket}
                onChange={(v) => set("ticket", v)}
                label="Flight Ticket"
                description="We book your flight there and back."
              />
              <Toggle
                checked={selection.airportPickup}
                onChange={(v) => set("airportPickup", v)}
                label="Airport Pickup"
                description="Met on arrival and driven straight to your hotel."
              />
              <Toggle
                checked={selection.airportDropoff}
                onChange={(v) => set("airportDropoff", v)}
                label="Airport Drop-off"
                description="Driven to the airport ahead of your departure."
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mt-10 mb-1">Makkah</h3>
            <div className="divide-y divide-maroon/10">
              <RoomSelect
                value={selection.makkahRoom}
                onChange={(v) => set("makkahRoom", v)}
                label="Makkah Accommodation"
                description="Choose your hotel rating near the Haram."
              />
              <Toggle
                checked={selection.makkahZiyara}
                onChange={(v) => set("makkahZiyara", v)}
                label="Makkah Ziyara"
                description="Guided tour of the holy sites in Makkah."
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-xs tracking-widest-lg uppercase text-gold-dark mt-10 mb-1">Madeenah</h3>
            <div className="divide-y divide-maroon/10">
              <RoomSelect
                value={selection.madeenaRoom}
                onChange={(v) => set("madeenaRoom", v)}
                label="Madeena Accommodation"
                description="Choose your hotel rating near the Prophet's Mosque."
              />
              <Toggle
                checked={selection.madeenaZiyara}
                onChange={(v) => set("madeenaZiyara", v)}
                label="Madeena Ziyara"
                description="Guided tour of the holy sites in Madeenah."
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
                {count === 0 ? "Nothing selected yet" : `${count} service${count > 1 ? "s" : ""} selected`}
                {" · "}
                {selection.quantity} {selection.quantity > 1 ? "packages" : "package"}
              </p>
              <p className="font-serif text-xl md:text-2xl text-cream text-balance">
                Send your choices to our team.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-10 py-4 bg-gold text-maroon-dark text-sm tracking-widest-lg uppercase font-sans font-medium hover:bg-gold-light transition-colors whitespace-nowrap"
            >
              Enquire Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
