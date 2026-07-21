import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { useT, type Bi } from "../lib/i18n";

const VALUES: { title: Bi; ar: string; desc: Bi }[] = [
  {
    title: { en: "Wafd", ml: "വഫ്ദ്" },
    ar: "الوفد",
    desc: {
      en: "A delegation — people who arrive with honor, and are welcomed with honor.",
      ml: "ബഹുമാനത്തോടെ എത്തുകയും ബഹുമാനത്തോടെ സ്വീകരിക്കപ്പെടുകയും ചെയ്യുന്നവർ — ഒരു പ്രതിനിധി സംഘം.",
    },
  },
  {
    title: { en: "Discretion", ml: "രഹസ്യസ്വഭാവം" },
    ar: "الكتمان",
    desc: {
      en: "One person to talk to. No confusion, no being passed around.",
      ml: "സംസാരിക്കാൻ ഒരാൾ മാത്രം. ആശയക്കുഴപ്പമില്ല, പലരിലേക്കും അയക്കുന്നില്ല.",
    },
  },
  {
    title: { en: "Precision", ml: "കൃത്യത" },
    ar: "الدقة",
    desc: {
      en: "We only promise a visa, seat, or room once it's confirmed.",
      ml: "ഉറപ്പായതിന് ശേഷം മാത്രമേ ഞങ്ങൾ വിസയോ സീറ്റോ റൂമോ വാഗ്ദാനം ചെയ്യൂ.",
    },
  },
];

export default function About() {
  const t = useT();

  return (
    <div>
      <ParallaxSurface image="/images/about-hero.jpg" height="60svh">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-xs tracking-widest-lg uppercase mb-5">
            {t({ en: "About Al Wafd", ml: "അൽ വഫ്ദിനെക്കുറിച്ച്" })}
          </p>
          <h1 className="text-cream text-4xl md:text-6xl max-w-2xl text-balance leading-tight">
            {t({ en: "A Delegation, Welcomed With Honor", ml: "ബഹുമാനത്തോടെ സ്വീകരിക്കുന്ന ഒരു പ്രതിനിധി സംഘം" })}
          </h1>
        </div>
      </ParallaxSurface>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <OrnamentDivider className="mb-10" />
            <p className="text-2xl md:text-3xl font-serif font-medium text-maroon leading-snug text-balance">
              {t({
                en: '"Al Wafd" means "the delegation" — people who travel to be welcomed. We built this company to welcome them the right way.',
                ml: '"അൽ വഫ്ദ്" എന്നാൽ "പ്രതിനിധി സംഘം" എന്നാണ് അർത്ഥം — സ്വീകരിക്കപ്പെടാൻ യാത്ര ചെയ്യുന്നവർ. അവരെ ശരിയായ രീതിയിൽ സ്വീകരിക്കാനാണ് ഞങ്ങൾ ഈ കമ്പനി തുടങ്ങിയത്.',
              })}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              {t({
                en: "Every pilgrim who comes for Umrah is a guest of Allah's House. Our job is simple, and we take it seriously: we handle the visa, flights, hotels, and guided visits — so nothing gets in the way of your worship.",
                ml: "ഉംറക്ക് വരുന്ന ഓരോ തീർത്ഥാടകനും അല്ലാഹുവിന്റെ ഭവനത്തിന്റെ അതിഥിയാണ്. ഞങ്ങളുടെ ജോലി ലളിതമാണ്, ഞങ്ങൾ അത് ഗൗരവത്തോടെ ചെയ്യുന്നു: വിസ, ഫ്ലൈറ്റ്, ഹോട്ടൽ, ഗൈഡഡ് സന്ദർശനങ്ങൾ എന്നിവ ഞങ്ങൾ കൈകാര്യം ചെയ്യും — നിങ്ങളുടെ ആരാധനക്ക് ഒരു തടസ്സവും വരാതെ.",
              })}
            </p>
            <p className="mt-6 text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              {t({
                en: "No call centers. No copy-paste replies. Our team answers you directly, remembers what you like, and gives the same care to every question — big or small.",
                ml: "കോൾ സെന്ററുകൾ ഇല്ല. പകർത്തിയ മറുപടികൾ ഇല്ല. ഞങ്ങളുടെ ടീം നേരിട്ട് നിങ്ങൾക്ക് മറുപടി നൽകും, നിങ്ങളുടെ ഇഷ്ടങ്ങൾ ഓർത്തിരിക്കും, ചെറുതോ വലുതോ ആയ എല്ലാ ചോദ്യങ്ങൾക്കും ഒരേ ശ്രദ്ധ നൽകും.",
              })}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-maroon">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-px bg-cream/10">
          {VALUES.map((v, i) => (
            <Reveal key={v.title.en} delay={i * 0.1}>
              <div className="bg-maroon h-full p-10 text-center">
                <p className="font-serif font-medium text-gold text-3xl mb-2">{v.ar}</p>
                <h3 className="text-cream text-xl mb-4 tracking-wide">{t(v.title)}</h3>
                <p className="text-cream/60 font-normal text-sm leading-relaxed">{t(v.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl text-maroon mb-6">
              {t({ en: "A Real Promise, Not Just Words", ml: "വാക്കുകളല്ല, ഒരു യഥാർത്ഥ വാഗ്ദാനം" })}
            </h2>
            <p className="text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              {t({
                en: "We only do one thing: Umrah. That means we do it well. From the moment we file your visa to your last visit in Madeenah, one team stays with you the whole way.",
                ml: "ഞങ്ങൾ ഒരു കാര്യം മാത്രമേ ചെയ്യൂ: ഉംറ. അതുകൊണ്ട് ഞങ്ങൾ അത് നന്നായി ചെയ്യുന്നു. നിങ്ങളുടെ വിസ ഫയൽ ചെയ്യുന്നത് മുതൽ മദീനയിലെ അവസാന സന്ദർശനം വരെ, ഒരു ടീം എപ്പോഴും നിങ്ങളോടൊപ്പം ഉണ്ടാകും.",
              })}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
