import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";

const VALUES = [
  {
    title: "Wafd",
    ar: "الوفد",
    desc: "A delegation — people who arrive with honor, and are welcomed with honor.",
  },
  {
    title: "Discretion",
    ar: "الكتمان",
    desc: "One person to talk to. No confusion, no being passed around.",
  },
  {
    title: "Precision",
    ar: "الدقة",
    desc: "We only promise a visa, seat, or room once it's confirmed.",
  },
];

export default function About() {
  return (
    <div>
      <ParallaxSurface image="/images/about-hero.jpg" height="60svh">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-xs tracking-widest-lg uppercase mb-5">About Al Wafd</p>
          <h1 className="text-cream text-4xl md:text-6xl max-w-2xl text-balance leading-tight">
            A Delegation, Welcomed With Honor
          </h1>
        </div>
      </ParallaxSurface>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <OrnamentDivider className="mb-10" />
            <p className="text-2xl md:text-3xl font-serif font-medium text-maroon leading-snug text-balance">
              "Al Wafd" means "the delegation" — people who travel to be
              welcomed. We built this company to welcome them the right way.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              Every pilgrim who comes for Umrah is a guest of Allah's House.
              Our job is simple, and we take it seriously: we handle the
              visa, flights, hotels, and guided visits — so nothing gets in
              the way of your worship.
            </p>
            <p className="mt-6 text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              No call centers. No copy-paste replies. Our team answers you
              directly, remembers what you like, and gives the same care to
              every question — big or small.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-maroon">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-px bg-cream/10">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="bg-maroon h-full p-10 text-center">
                <p className="font-serif font-medium text-gold text-3xl mb-2">{v.ar}</p>
                <h3 className="text-cream text-xl mb-4 tracking-wide">{v.title}</h3>
                <p className="text-cream/60 font-normal text-sm leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl text-maroon mb-6">A Real Promise, Not Just Words</h2>
            <p className="text-ink/60 font-normal leading-relaxed text-base md:text-lg">
              We only do one thing: Umrah. That means we do it well. From
              the moment we file your visa to your last visit in Madeenah,
              one team stays with you the whole way.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
