import ParallaxSurface from "../components/ParallaxSurface";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";

const VALUES = [
  {
    title: "Wafd",
    ar: "الوفد",
    desc: "A delegation — those who arrive with honor, and are received with honor in turn.",
  },
  {
    title: "Discretion",
    ar: "الكتمان",
    desc: "A single point of contact. No layers, no hand-offs, no noise.",
  },
  {
    title: "Precision",
    ar: "الدقة",
    desc: "Every visa, seat, and room confirmed before it is promised.",
  },
];

export default function About() {
  return (
    <div>
      <ParallaxSurface image="/images/about-hero.jpg" height="60svh">
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-xs tracking-widest-lg uppercase mb-5">About Al Wafd</p>
          <h1 className="text-cream text-4xl md:text-6xl max-w-2xl text-balance leading-tight">
            The Delegation, Received With Honor
          </h1>
        </div>
      </ParallaxSurface>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <OrnamentDivider className="mb-10" />
            <p className="text-2xl md:text-3xl font-serif text-maroon leading-snug text-balance">
              "Al Wafd" means the delegation — those who travel to be received.
              We built this house to receive them properly.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 text-ink/60 font-light leading-relaxed text-base md:text-lg">
              Every guest who travels for Umrah arrives as part of a delegation
              to the House of Allah. Our role is simple, and we take it
              seriously: to handle the logistics — visas, flights,
              accommodation, and guided Ziyara — so completely and so quietly
              that nothing stands between you and the reason you came.
            </p>
            <p className="mt-6 text-ink/60 font-light leading-relaxed text-base md:text-lg">
              No call centers. No templated replies. A concierge team that
              answers directly, remembers your preferences, and treats every
              enquiry — from a single question to a full family itinerary —
              with the same unhurried attention.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-maroon">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-px bg-cream/10">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="bg-maroon h-full p-10 text-center">
                <p className="font-serif text-gold text-3xl mb-2">{v.ar}</p>
                <h3 className="text-cream text-xl mb-4 tracking-wide">{v.title}</h3>
                <p className="text-cream/60 font-light text-sm leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-36 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl text-maroon mb-6">A Standard, Not a Slogan</h2>
            <p className="text-ink/60 font-light leading-relaxed text-base md:text-lg">
              We keep our offering deliberately narrow — Umrah, and Umrah
              only — so that what we do, we do completely. From the moment
              your visa is filed to the final Ziyara in Madeenah, one team
              carries the journey from start to end.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
