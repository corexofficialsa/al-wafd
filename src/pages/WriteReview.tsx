import { useState } from "react";
import Reveal from "../components/Reveal";
import OrnamentDivider from "../components/OrnamentDivider";
import StarRating from "../components/StarRating";
import { createReview } from "../lib/reviews";
import { useT } from "../lib/i18n";

export default function WriteReview() {
  const t = useT();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim().length > 0 && text.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await createReview({ name: name.trim(), rating, text: text.trim() });
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div>
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 text-center">
        <Reveal>
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-5">
            {t({ en: "Share Your Experience", ml: "നിങ്ങളുടെ അനുഭവം പങ്കുവെക്കൂ" })}
          </p>
          <h1 className="text-4xl md:text-6xl text-maroon max-w-3xl mx-auto text-balance leading-tight">
            {t({ en: "Write a Review", ml: "അഭിപ്രായം എഴുതൂ" })}
          </h1>
          <OrnamentDivider className="mt-10" />
          <p className="mt-8 text-ink/55 font-normal max-w-xl mx-auto leading-relaxed">
            {t({
              en: "Tell other pilgrims about your trip with Al Wafd. Your review will appear on our homepage once our team approves it.",
              ml: "അൽ വഫ്ദിനൊപ്പമുള്ള നിങ്ങളുടെ യാത്രയെക്കുറിച്ച് മറ്റ് തീർത്ഥാടകരോട് പറയൂ. ടീം അംഗീകരിച്ച ശേഷം നിങ്ങളുടെ അഭിപ്രായം ഞങ്ങളുടെ ഹോംപേജിൽ ദൃശ്യമാകും.",
            })}
          </p>
        </Reveal>
      </section>

      <section className="pb-32 md:pb-40 px-6">
        <div className="max-w-lg mx-auto">
          <Reveal>
            {submitted ? (
              <div className="text-center border border-maroon/15 bg-cream-dim p-10 md:p-14">
                <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
                  {t({ en: "Thank You", ml: "നന്ദി" })}
                </p>
                <h2 className="text-2xl font-serif font-medium text-maroon mb-4">
                  {t({ en: "Review Received", ml: "അഭിപ്രായം ലഭിച്ചു" })}
                </h2>
                <p className="text-sm text-ink/55 font-normal leading-relaxed">
                  {t({
                    en: "Jazakallah khair for sharing your experience. It'll appear on our homepage once our team approves it.",
                    ml: "നിങ്ങളുടെ അനുഭവം പങ്കുവെച്ചതിന് നന്ദി. ടീം അംഗീകരിച്ച ശേഷം ഇത് ഞങ്ങളുടെ ഹോംപേജിൽ ദൃശ്യമാകും.",
                  })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-3">
                    {t({ en: "Your Rating", ml: "നിങ്ങളുടെ റേറ്റിംഗ്" })}
                  </label>
                  <StarRating value={rating} onChange={setRating} size={30} />
                </div>
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
                    {t({ en: "Your Review", ml: "നിങ്ങളുടെ അഭിപ്രായം" })}
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={5}
                    placeholder={t({
                      en: "Tell us about your trip with Al Wafd",
                      ml: "അൽ വഫ്ദിനൊപ്പമുള്ള നിങ്ങളുടെ യാത്രയെക്കുറിച്ച് പറയൂ",
                    })}
                    className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-4 py-3 text-sm outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full px-8 py-4 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? t({ en: "Submitting…", ml: "സമർപ്പിക്കുന്നു…" })
                    : t({ en: "Submit Review", ml: "സമർപ്പിക്കൂ" })}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
