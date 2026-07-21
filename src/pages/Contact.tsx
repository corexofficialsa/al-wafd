import { useState } from "react";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import { contactFormWhatsappUrl } from "../lib/whatsapp";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    window.open(contactFormWhatsappUrl({ name, phone, message }), "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">Contact</p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            Talk to Our Team
          </h1>
          <OrnamentDivider className="mt-10" />
        </Reveal>
      </section>

      <section className="pb-32 md:pb-40 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">Phone / WhatsApp</label>
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
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-3 text-lg font-normal transition-colors resize-none"
                  placeholder="Tell us about your journey"
                />
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full sm:w-auto px-10 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send via WhatsApp
              </button>
              <p className="text-xs text-ink/40 font-normal">
                This will open WhatsApp with your message ready to send.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full flex flex-col justify-center border-t md:border-t-0 md:border-l border-maroon/15 pt-10 md:pt-0 md:pl-16">
              <div className="mb-10">
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">WhatsApp &amp; Phone</p>
                <a href="tel:+966548609600" className="block text-2xl font-serif font-medium text-maroon hover:text-gold-dark transition-colors">
                  +966 54 860 9600
                </a>
              </div>
              <div className="mb-10">
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">Email</p>
                <a href="mailto:concierge@alwafd.travel" className="block text-lg font-normal text-ink/70 hover:text-maroon transition-colors">
                  concierge@alwafd.travel
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest-lg uppercase text-gold-dark mb-3">Offices</p>
                <p className="text-lg font-normal text-ink/70">Jeddah &middot; Makkah &middot; Madeenah</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
