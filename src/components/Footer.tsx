import { Link } from "react-router-dom";
import { useT } from "../lib/i18n";

export default function Footer() {
  const t = useT();

  return (
    <footer className="bg-maroon text-cream/80 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rule-gold mb-12 opacity-60" />
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.png" alt="Al Wafd" className="h-14 w-14 object-contain" />
              <span className="font-serif font-medium text-2xl text-gold">Al Wafd</span>
            </div>
            <p className="text-sm font-normal leading-relaxed text-cream/60 max-w-xs">
              {t({
                en: "We plan Umrah trips with care, from your visa to your guided visits to the holy sites.",
                ml: "വിസ മുതൽ പുണ്യസ്ഥലങ്ങളിലേക്കുള്ള ഗൈഡഡ് സന്ദർശനങ്ങൾ വരെ, ഞങ്ങൾ ശ്രദ്ധയോടെ ഉംറ യാത്രകൾ ആസൂത്രണം ചെയ്യുന്നു.",
              })}
            </p>
          </div>

          <div className="text-sm">
            <div className="uppercase tracking-widest-lg text-[11px] text-gold/80 mb-4">
              {t({ en: "Navigate", ml: "മെനു" })}
            </div>
            <ul className="space-y-2 font-normal">
              <li><Link to="/" className="hover:text-gold transition-colors">{t({ en: "Home", ml: "ഹോം" })}</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">{t({ en: "About Us", ml: "ഞങ്ങളെക്കുറിച്ച്" })}</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition-colors">{t({ en: "Packages", ml: "പാക്കേജുകൾ" })}</Link></li>
              <li><Link to="/build" className="hover:text-gold transition-colors">{t({ en: "Build a Package", ml: "പാക്കേജ് തയ്യാറാക്കൂ" })}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t({ en: "Contact", ml: "ബന്ധപ്പെടുക" })}</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="uppercase tracking-widest-lg text-[11px] text-gold/80 mb-4">
              {t({ en: "Direct Line", ml: "നേരിട്ട് ബന്ധപ്പെടാൻ" })}
            </div>
            <ul className="space-y-2 font-normal text-cream/70">
              <li>
                <a href="tel:+966548609600" className="hover:text-gold transition-colors">+966 54 860 9600</a>
              </li>
              <li>
                <a href="mailto:concierge@alwafd.travel" className="hover:text-gold transition-colors">
                  concierge@alwafd.travel
                </a>
              </li>
              <li className="text-cream/50">{t({ en: "Jeddah · Makkah · Madeenah", ml: "ജിദ്ദ · മക്ക · മദീന" })}</li>
            </ul>
          </div>
        </div>

        <div className="rule-gold my-10 opacity-30" />
        <p className="text-[11px] tracking-wide text-cream/40 font-normal">
          {t({
            en: `© ${new Date().getFullYear()} Al Wafd Travel & Umrah Services. All rights reserved.`,
            ml: `© ${new Date().getFullYear()} അൽ വഫ്ദ് ട്രാവൽ & ഉംറ സർവീസസ്. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.`,
          })}
        </p>
      </div>
    </footer>
  );
}
