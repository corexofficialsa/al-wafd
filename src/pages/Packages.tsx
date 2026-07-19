import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { presetPackageWhatsappUrl } from "../lib/whatsapp";

interface Preset {
  name: string;
  tag: string;
  desc: string;
  features: string[];
  featured?: boolean;
}

const PRESETS: Preset[] = [
  {
    name: "Economy Package",
    tag: "Modest & Sincere",
    desc: "Every essential, handled properly — for the pilgrim who travels with a simple heart and a simple budget.",
    features: [
      "Visa Processing",
      "Flight Ticket (Economy)",
      "Makkah Accommodation — 2 Star",
      "Madeena Accommodation — 2 Star",
      "Shared Ziyara transport",
    ],
  },
  {
    name: "Comfort Package",
    tag: "Balanced & Refined",
    desc: "A comfortable middle path — well-located stays and guided Ziyara, without excess.",
    features: [
      "Visa Processing",
      "Flight Ticket (Economy Plus)",
      "Makkah Accommodation — 3 Star",
      "Makkah Ziyara — Guided",
      "Madeena Accommodation — 3 Star",
      "Madeena Ziyara — Guided",
    ],
    featured: true,
  },
  {
    name: "Elite 5-Star Package",
    tag: "The Full Delegation",
    desc: "Uncompromising 5-Star hospitality, moments from the Haram in both cities, start to end.",
    features: [
      "Visa Processing",
      "Flight Ticket (Business Available)",
      "Makkah Accommodation — 5 Star, Haram View",
      "Makkah Ziyara — Private Guided",
      "Madeena Accommodation — 5 Star",
      "Madeena Ziyara — Private Guided",
    ],
  },
];

export default function Packages() {
  return (
    <div>
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">Preset Journeys</p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            Three Ways to Travel, Each Fully Curated
          </h1>
          <OrnamentDivider className="mt-10" />
          <p className="mt-8 text-ink/55 font-light max-w-xl mx-auto leading-relaxed">
            Choose a preset below for an instant, complete itinerary — or
            build your own from the ground up.
          </p>
        </Reveal>
      </section>

      <section className="pb-28 md:pb-36 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 items-stretch">
          {PRESETS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <div
                className={`h-full flex flex-col p-10 border transition-colors ${
                  p.featured
                    ? "border-gold bg-maroon text-cream relative"
                    : "border-maroon/15 bg-white/40 text-ink hover:border-gold/60"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-10 bg-gold text-maroon-dark text-[10px] tracking-widest-lg uppercase px-3 py-1 font-medium">
                    Most Chosen
                  </span>
                )}
                <p className={`text-[11px] tracking-widest-lg uppercase mb-3 ${p.featured ? "text-gold" : "text-gold-dark"}`}>
                  {p.tag}
                </p>
                <h2 className={`text-2xl font-serif mb-4 ${p.featured ? "text-cream" : "text-maroon"}`}>{p.name}</h2>
                <p className={`text-sm font-light leading-relaxed mb-8 ${p.featured ? "text-cream/70" : "text-ink/55"}`}>
                  {p.desc}
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-light">
                      <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${p.featured ? "bg-gold" : "bg-maroon"}`} />
                      <span className={p.featured ? "text-cream/85" : "text-ink/70"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={presetPackageWhatsappUrl(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-center py-4 text-sm tracking-widest-lg uppercase font-sans transition-colors ${
                    p.featured
                      ? "bg-gold text-maroon-dark hover:bg-gold-light"
                      : "bg-maroon text-cream hover:bg-maroon-light"
                  }`}
                >
                  Enquire Now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-28 md:pb-36 px-6 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl text-maroon mb-6">None of these quite right?</h2>
          <p className="text-ink/55 font-light mb-8 max-w-md mx-auto">
            Build a package to your exact specification — room star ratings,
            Ziyara, visa, and flights, chosen piece by piece.
          </p>
          <Link
            to="/build"
            className="inline-block px-10 py-4 border border-maroon text-maroon text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon hover:text-cream transition-colors"
          >
            Build a Package
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
