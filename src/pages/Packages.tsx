import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { PRESET_PACKAGES, presetWhatsappUrl, formatSar } from "../lib/presets";

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
            build your own from the ground up. Prices are per person,
            starting from, based on standard double occupancy.
          </p>
        </Reveal>
      </section>

      <section className="pb-28 md:pb-36 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 items-stretch">
          {PRESET_PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="h-full">
              <div
                className={`h-full flex flex-col pl-20 pr-6 py-10 sm:p-10 border transition-colors ${
                  p.featured
                    ? "border-gold bg-maroon text-cream relative"
                    : "border-maroon/15 bg-white/40 text-ink hover:border-gold/60"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-10 bg-gold text-maroon-dark text-[10px] tracking-widest-lg uppercase px-3 py-1 font-medium flex items-center gap-1">
                    <span aria-hidden="true">★</span> Recommended
                  </span>
                )}
                <p className={`text-[11px] tracking-widest-lg uppercase mb-3 ${p.featured ? "text-gold" : "text-gold-dark"}`}>
                  {p.tag}
                </p>
                <h2 className={`text-2xl font-serif mb-3 ${p.featured ? "text-cream" : "text-maroon"}`}>{p.name}</h2>

                <div className="mb-5">
                  <p className={`text-[11px] uppercase tracking-widest-lg ${p.featured ? "text-cream/50" : "text-ink/40"}`}>
                    Starting from
                  </p>
                  <p className={`font-serif text-3xl ${p.featured ? "text-gold" : "text-maroon"}`}>
                    {formatSar(p.priceSar)}
                    <span className={`ml-2 text-sm font-sans font-light ${p.featured ? "text-cream/60" : "text-ink/45"}`}>
                      / person (~${p.priceUsdApprox.toLocaleString("en-US")} USD)
                    </span>
                  </p>
                </div>

                <p className={`text-sm font-light leading-relaxed mb-8 ${p.featured ? "text-cream/70" : "text-ink/55"}`}>
                  {p.blurb}
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
                  href={presetWhatsappUrl(p)}
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
