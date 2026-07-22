import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { PRESET_PACKAGES } from "../lib/presets";
import { useT, type Bi } from "../lib/i18n";

const STATS: { value: string; label: Bi }[] = [
  { value: "30,000+", label: { en: "Happy Customers Served", ml: "സന്തുഷ്ട ഉപഭോക്താക്കൾ" } },
  { value: "8+", label: { en: "Years of Experience", ml: "വർഷത്തെ അനുഭവപരിചയം" } },
];

const SERVICES: { title: Bi; desc: Bi }[] = [
  {
    title: { en: "Visa Processing", ml: "വിസ പ്രോസസ്സിംഗ്" },
    desc: { en: "We take care of all your visa paperwork.", ml: "നിങ്ങളുടെ വിസ കടലാസുകൾ എല്ലാം ഞങ്ങൾ ശ്രദ്ധിക്കും." },
  },
  {
    title: { en: "Flight Ticket", ml: "ഫ്ലൈറ്റ് ടിക്കറ്റ്" },
    desc: {
      en: "We book your flight with the airline and times you want.",
      ml: "നിങ്ങൾ ആഗ്രഹിക്കുന്ന എയർലൈനിലും സമയത്തും ഫ്ലൈറ്റ് ബുക്ക് ചെയ്യും.",
    },
  },
  {
    title: { en: "Makkah Accommodation", ml: "മക്ക താമസം" },
    desc: {
      en: "From simple 1-star hotels to 5-star hotels next to the Haram.",
      ml: "ലളിതമായ 1-സ്റ്റാർ ഹോട്ടൽ മുതൽ ഹറമിനടുത്തുള്ള 5-സ്റ്റാർ ഹോട്ടൽ വരെ.",
    },
  },
  {
    title: { en: "Makkah Ziyara", ml: "മക്ക സിയാറ" },
    desc: { en: "A guide takes you to the holy sites, at an easy pace.", ml: "ഒരു ഗൈഡ് നിങ്ങളെ പുണ്യസ്ഥലങ്ങളിലേക്ക് സാവധാനം കൊണ്ടുപോകും." },
  },
  {
    title: { en: "Madeena Accommodation", ml: "മദീന താമസം" },
    desc: { en: "Stay close to the Prophet's Mosque.", ml: "മസ്ജിദുന്നബവിക്ക് അടുത്ത് താമസിക്കാം." },
  },
  {
    title: { en: "Madeena Ziyara", ml: "മദീന സിയാറ" },
    desc: { en: "A guide takes you around the Prophet's city ﷺ.", ml: "ഒരു ഗൈഡ് നിങ്ങളെ നബി നഗരത്തിൽ ചുറ്റി കാണിക്കും." },
  },
];

export default function Home() {
  const t = useT();

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
            {t({ en: "Al Wafd · The Delegation", ml: "അൽ വഫ്ദ് · പ്രതിനിധി സംഘം" })}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-cream text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] text-balance max-w-4xl break-words"
          >
            {t({ en: "A Journey Made for the ", ml: "ഒരു വിശിഷ്ട യാത്ര " })}
            <span className="text-gradient-gold italic">
              {t({ en: "Guest of Allah", ml: "അല്ലാഹുവിന്റെ അതിഥികൾക്ക്" })}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-cream/75 font-sans font-normal text-base md:text-lg max-w-xl"
          >
            {t({
              en: "We handle your whole Umrah trip — visa, flights, and hotels — with care, so you can focus on your worship.",
              ml: "വിസ, ഫ്ലൈറ്റ്, ഹോട്ടൽ ഉൾപ്പെടെ നിങ്ങളുടെ ഉംറ യാത്ര മുഴുവൻ ഞങ്ങൾ ശ്രദ്ധയോടെ ഒരുക്കും — നിങ്ങൾക്ക് ആരാധനയിൽ മാത്രം ശ്രദ്ധിക്കാം.",
            })}
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
              {t({ en: "Build Your Package", ml: "പാക്കേജ് തയ്യാറാക്കൂ" })}
            </Link>
            <Link
              to="/packages"
              className="px-8 py-4 border border-cream/40 text-cream text-sm tracking-widest-lg uppercase font-sans font-normal hover:border-gold hover:text-gold transition-colors"
            >
              {t({ en: "View Packages", ml: "പാക്കേജുകൾ കാണുക" })}
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

      {/* Trust bar */}
      <section className="py-16 md:py-20 px-6 bg-maroon">
        <div className="max-w-3xl mx-auto grid grid-cols-2 divide-x divide-cream/15 text-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.1}>
              <p className="font-serif font-semibold text-gold text-4xl md:text-6xl mb-2">{s.value}</p>
              <p className="text-cream/70 text-[11px] md:text-xs tracking-widest-lg uppercase">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <OrnamentDivider className="mb-8" />
            <h2 className="text-3xl md:text-5xl text-maroon text-balance leading-tight">
              {t({ en: "We handle every detail,", ml: "എല്ലാ കാര്യങ്ങളും ഞങ്ങൾ ശ്രദ്ധിക്കും," })}
              <br className="hidden md:block" />
              {t({ en: " so you can focus on your worship.", ml: " നിങ്ങൾക്ക് ആരാധനയിൽ മാത്രം ശ്രദ്ധിക്കാം." })}
            </h2>
            <p className="mt-8 text-ink/60 font-normal text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              {t({
                en: "Al Wafd makes your pilgrimage easy. One trusted team takes care of your visa, travel, and hotels, with care and attention to every detail.",
                ml: "അൽ വഫ്ദ് നിങ്ങളുടെ തീർത്ഥാടനം എളുപ്പമാക്കുന്നു. വിശ്വസ്തരായ ഒരു ടീം നിങ്ങളുടെ വിസ, യാത്ര, ഹോട്ടൽ എന്നിവ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യുന്നു.",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick access — package builder teaser */}
      <section className="py-24 md:py-32 bg-cream-dim">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-16">
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
              {t({ en: "Build Your Own", ml: "സ്വന്തമായി തയ്യാറാക്കൂ" })}
            </p>
            <h2 className="text-3xl md:text-4xl text-maroon">
              {t({ en: "Six Services, Built Around You.", ml: "ആറ് സേവനങ്ങൾ, നിങ്ങൾക്കായി ഒരുക്കിയത്." })}
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-maroon/10 border border-maroon/10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title.en} delay={i * 0.06} y={20}>
                <div className="bg-cream h-full p-8 hover:bg-white transition-colors">
                  <div className="text-gold text-3xl font-serif font-semibold mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-lg text-maroon mb-2">{t(s.title)}</h3>
                  <p className="text-sm text-ink/55 font-normal leading-relaxed">{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-14">
            <Link
              to="/build"
              className="inline-block px-10 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors"
            >
              {t({ en: "Open the Package Builder", ml: "പാക്കേജ് ബിൽഡർ തുറക്കൂ" })}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Preset packages preview */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
              {t({ en: "Or Choose With Ease", ml: "അല്ലെങ്കിൽ എളുപ്പത്തിൽ തിരഞ്ഞെടുക്കൂ" })}
            </p>
            <h2 className="text-3xl md:text-4xl text-maroon">{t({ en: "Ready-Made Packages", ml: "തയ്യാറായ പാക്കേജുകൾ" })}</h2>
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
                    <p className="text-[11px] tracking-widest-lg uppercase text-gold-dark mb-3">{t(p.tag)}</p>
                    <h3 className="text-2xl font-serif text-maroon mb-4">{t(p.name)}</h3>
                    <p className="text-sm text-ink/55 font-normal leading-relaxed mb-8">{t(p.blurb)}</p>
                    <span className="text-xs tracking-widest-lg uppercase text-maroon group-hover:text-gold-dark transition-colors">
                      {t({ en: "Explore →", ml: "കാണുക →" })}
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
              {t({ en: "Start with one message.", ml: "ഒരു സന്ദേശത്തിൽ തുടങ്ങൂ." })}
            </h2>
            <p className="text-cream/70 font-normal mb-10 max-w-md mx-auto">
              {t({ en: "Our team will reply to you within the hour.", ml: "ഞങ്ങളുടെ ടീം ഒരു മണിക്കൂറിനുള്ളിൽ മറുപടി നൽകും." })}
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-gold text-maroon-dark text-sm tracking-widest-lg uppercase font-sans font-medium hover:bg-gold-light transition-colors"
            >
              {t({ en: "Speak With Al Wafd", ml: "അൽ വഫ്ദുമായി സംസാരിക്കൂ" })}
            </Link>
          </Reveal>
        </div>
      </ParallaxSurface>
    </div>
  );
}
