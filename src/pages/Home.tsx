import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { PRESET_PACKAGES, formatSar } from "../lib/presets";

const SERVICES = [
  { title: "Visa Processing", desc: "Full documentation, handled discreetly and in advance." },
  { title: "Flight Ticket", desc: "Seats arranged on your preferred carrier and schedule." },
  { title: "Makkah Accommodation", desc: "From modest 1-Star to the 5-Star towers overlooking the Haram." },
  { title: "Makkah Ziyara", desc: "Guided tours of the holy sites, paced and unhurried." },
  { title: "Madeena Accommodation", desc: "Stay within steps of Al-Masjid an-Nabawi." },
  { title: "Madeena Ziyara", desc: "A guided passage through the city of the Prophet ﷺ." },
];

export default function Home() {
  return (
    <div>
      <ParallaxSurface image="/images/hero-makkah.jpg" height="100svh">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gold text-xs md:text-sm tracking-widest-lg uppercase mb-6"
          >
            Al Wafd &middot; The Delegation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-cream text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-balance max-w-4xl"
          >
            A Journey Worthy of the <span className="text-gradient-gold italic">Guest of Allah</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-cream/75 font-sans font-light text-base md:text-lg max-w-xl"
          >
            Bespoke Umrah concierge — visas, travel, and accommodation curated
            with quiet, premium hospitality for the Delegation of the House.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/build"
              className="px-8 py-4 bg-gold text-maroon-dark text-sm tracking-widest-lg uppercase font-sans font-medium hover:bg-gold-light transition-colors"
            >
              Build Your Package
            </Link>
            <Link
              to="/packages"
              className="px-8 py-4 border border-cream/40 text-cream text-sm tracking-widest-lg uppercase font-sans font-light hover:border-gold hover:text-gold transition-colors"
            >
              View Packages
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 inset-x-0 flex justify-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
        </motion.div>
      </ParallaxSurface>

      {/* Philosophy */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <OrnamentDivider className="mb-8" />
            <h2 className="text-3xl md:text-5xl text-maroon text-balance leading-tight">
              Every detail attended to,<br className="hidden md:block" /> so nothing distracts from the sacred.
            </h2>
            <p className="mt-8 text-ink/60 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Al Wafd exists to remove friction from your pilgrimage — a single,
              trusted point of contact for visas, travel, and stay, arranged
              with the restraint and precision of true hospitality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick access — package builder teaser */}
      <section className="py-24 md:py-32 bg-cream-dim">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-16">
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">Build Your Own</p>
            <h2 className="text-3xl md:text-4xl text-maroon">Six Services. Your Exact Journey.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-maroon/10 border border-maroon/10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} y={20}>
                <div className="bg-cream h-full p-8 hover:bg-white transition-colors">
                  <div className="text-gold text-2xl font-serif mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-lg text-maroon mb-2">{s.title}</h3>
                  <p className="text-sm text-ink/55 font-light leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-14">
            <Link
              to="/build"
              className="inline-block px-10 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors"
            >
              Open the Package Builder
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Preset packages preview */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">Or Choose With Ease</p>
            <h2 className="text-3xl md:text-4xl text-maroon">Curated Preset Journeys</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {PRESET_PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <Link
                  to="/packages"
                  className="group block border border-maroon/15 pl-20 pr-6 py-10 sm:p-10 h-full hover:border-gold transition-colors relative overflow-hidden"
                >
                  <div className="absolute inset-0 surface-warm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-3">{p.tag}</p>
                    <h3 className="text-2xl font-serif text-maroon mb-2">{p.name}</h3>
                    <p className="text-sm font-serif text-gold-dark mb-4">
                      From {formatSar(p.priceSar)} <span className="font-sans text-ink/40">/ person</span>
                    </p>
                    <p className="text-sm text-ink/55 font-light leading-relaxed mb-8">{p.blurb}</p>
                    <span className="text-xs tracking-widest-lg uppercase text-maroon group-hover:text-gold-dark transition-colors">
                      Explore &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ParallaxSurface image="/images/cta-madinah.jpg" height="70svh" surfaceClassName="surface-haram">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-cream mb-6 max-w-2xl text-balance">
              Begin with a single message.
            </h2>
            <p className="text-cream/70 font-light mb-10 max-w-md mx-auto">
              Our concierge team replies personally, within the hour.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-gold text-maroon-dark text-sm tracking-widest-lg uppercase font-sans font-medium hover:bg-gold-light transition-colors"
            >
              Speak With Al Wafd
            </Link>
          </Reveal>
        </div>
      </ParallaxSurface>
    </div>
  );
}
