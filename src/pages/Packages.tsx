import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { PRESET_PACKAGES, presetWhatsappUrl } from "../lib/presets";

export default function Packages() {
  return (
    <div>
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">Ready-Made Packages</p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            Three Packages to Choose From
          </h1>
          <OrnamentDivider className="mt-10" />
          <p className="mt-8 text-ink/55 font-normal max-w-xl mx-auto leading-relaxed">
            Pick one of the packages below, or build your own from scratch.
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
                  <span className="absolute -top-3 left-10 bg-gold text-maroon-dark text-[10px] tracking-widest-lg uppercase px-3 py-1 font-medium">
                    Most Chosen
                  </span>
                )}
                <p className={`text-[11px] tracking-widest-lg uppercase mb-3 ${p.featured ? "text-gold" : "text-gold-dark"}`}>
                  {p.tag}
                </p>
                <h2 className={`text-2xl font-serif mb-4 ${p.featured ? "text-cream" : "text-maroon"}`}>{p.name}</h2>

                <p className={`text-sm font-normal leading-relaxed mb-8 ${p.featured ? "text-cream/70" : "text-ink/55"}`}>
                  {p.blurb}
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-normal">
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
          <p className="text-ink/55 font-normal mb-8 max-w-md mx-auto">
            Build your own package. Choose your hotel rating, guided visits,
            visa, and flights — one by one.
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
