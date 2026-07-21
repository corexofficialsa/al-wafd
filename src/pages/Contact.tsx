import { useState } from "react";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { contactFormWhatsappUrl } from "../lib/whatsapp";
import { useT, useLanguage } from "../lib/i18n";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const t = useT();
  const { lang } = useLanguage();

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    window.open(contactFormWhatsappUrl({ name, phone, message }, lang), "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">
            {t({ en: "Contact", ml: "ബന്ധപ്പെടുക" })}
          </p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            {t({ en: "Talk to Our Team", ml: "ഞങ്ങളുടെ ടീമുമായി സംസാരിക്കൂ" })}
          </h1>
          <OrnamentDivider className="mt-10" />
        </Reveal>
      </section>

      <section className="pb-32 md:pb-40 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">
                  {t({ en: "Full Name", ml: "പൂർണ്ണ പേര്" })}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors"
                  placeholder={t({ en: "Your name", ml: "നിങ്ങളുടെ പേര്" })}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">
                  {t({ en: "Phone / WhatsApp", ml: "ഫോൺ / വാട്സാപ്പ്" })}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors"
                  placeholder="+966 5X XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">
                  {t({ en: "Message", ml: "സന്ദേശം" })}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors resize-none"
                  placeholder={t({ en: "Tell us about your journey", ml: "നിങ്ങളുടെ യാത്രയെക്കുറിച്ച് പറയൂ" })}
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full sm:w-auto px-10 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t({ en: "Send via WhatsApp", ml: "വാട്സാപ്പ് വഴി അയക്കൂ" })}
              </button>
              <p className="text-xs text-ink/40 font-normal">
                {t({
                  en: "This will open WhatsApp with your message ready to send.",
                  ml: "ഇത് നിങ്ങളുടെ സന്ദേശം തയ്യാറായി വാട്സാപ്പ് തുറക്കും.",
                })}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full flex flex-col justify-center border-t md:border-t-0 md:border-l border-maroon/15 pt-10 md:pt-0 md:pl-16">
              <div className="mb-10">
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">
                  {t({ en: "WhatsApp & Phone", ml: "വാട്സാപ്പ് & ഫോൺ" })}
                </p>
                <a href="tel:+966548609600" className="block text-2xl font-serif font-medium text-maroon hover:text-gold-dark transition-colors">
                  +966 54 860 9600
                </a>
              </div>
              <div className="mb-10">
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">
                  {t({ en: "Email", ml: "ഇമെയിൽ" })}
                </p>
                <a href="mailto:concierge@alwafd.travel" className="block text-lg font-normal text-ink/70 hover:text-maroon transition-colors">
                  concierge@alwafd.travel
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">
                  {t({ en: "Offices", ml: "ഓഫീസുകൾ" })}
                </p>
                <p className="text-lg font-normal text-ink/70">
                  {t({ en: "Jeddah · Makkah · Madeenah", ml: "ജിദ്ദ · മക്ക · മദീന" })}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
