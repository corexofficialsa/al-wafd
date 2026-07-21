import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { PRESET_PACKAGES } from "../lib/presets";

const SERVICES = [
  { title: "Visa Processing", desc: "We take care of all your visa paperwork." },
  { title: "Flight Ticket", desc: "We book your flight with the airline and times you want." },
  { title: "Makkah Accommodation", desc: "From simple 1-star hotels to 5-star hotels next to the Haram." },
  { title: "Makkah Ziyara", desc: "A guide takes you to the holy sites, at an easy pace." },
  { title: "Madeena Accommodation", desc: "Stay close to the Prophet's Mosque." },
  { title: "Madeena Ziyara", desc: "A guide takes you around the Prophet's city ﷺ." },
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
            A Journey Made for the <span className="text-gradient-gold italic">Guest of Allah</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-cream/75 font-sans font-normal text-base md:text-lg max-w-xl"
          >
            We handle your whole Umrah trip — visa, flights, and hotels —
            with care, so you can focus on your worship.
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
              className="px-8 py-4 border border-cream/40 text-cream text-sm tracking-widest-lg uppercase font-sans font-normal hover:border-gold hover:text-gold transition-colors"
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
              We handle every detail,<br className="hidden md:block" /> so you can focus on your worship.
            </h2>
            <p className="mt-8 text-ink/60 font-normal text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Al Wafd makes your pilgrimage easy. One trusted team takes
              care of your visa, travel, and hotels, with care and
              attention to every detail.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick access — package builder teaser */}
      <section className="py-24 md:py-32 bg-cream-dim">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-16">
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">Build Your Own</p>
            <h2 className="text-3xl md:text-4xl text-maroon">Six Services, Built Around You.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-maroon/10 border border-maroon/10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} y={20}>
                <div className="bg-cream h-full p-8 hover:bg-white transition-colors">
                  <div className="text-gold text-3xl font-serif font-semibold mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-lg text-maroon mb-2">{s.title}</h3>
                  <p className="text-sm text-ink/55 font-normal leading-relaxed">{s.desc}</p>
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
            <h2 className="text-3xl md:text-4xl text-maroon">Ready-Made Packages</h2>
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
                    <h3 className="text-2xl font-serif text-maroon mb-4">{p.name}</h3>
                    <p className="text-sm text-ink/55 font-normal leading-relaxed mb-8">{p.blurb}</p>
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
              Start with one message.
            </h2>
            <p className="text-cream/70 font-normal mb-10 max-w-md mx-auto">
              Our team will reply to you within the hour.
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
