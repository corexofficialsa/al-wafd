import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import StarRating from "./StarRating";
import { createReview, subscribeApprovedReviews, type Review } from "../lib/reviews";
import { useT } from "../lib/i18n";

function formatDate(ts: Review["createdAt"]): string {
  if (!ts) return "";
  return ts.toDate().toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function Testimonials() {
  const t = useT();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => subscribeApprovedReviews(setReviews), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    await createReview({ name: name.trim(), rating, text: text.trim() });
    setSubmitting(false);
    setSubmitted(true);
  }

  function closeModal() {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setRating(5);
      setText("");
    }, 300);
  }

  return (
    <section className="py-24 md:py-32 px-6 bg-cream-dim">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
            {t({ en: "In Their Words", ml: "അവരുടെ വാക്കുകളിൽ" })}
          </p>
          <h2 className="text-3xl md:text-4xl text-maroon mb-8">
            {t({ en: "Testimonials", ml: "സാക്ഷ്യപത്രങ്ങൾ" })}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-block px-8 py-3.5 border border-maroon text-maroon text-xs tracking-widest-lg uppercase hover:bg-maroon hover:text-cream transition-colors"
          >
            {t({ en: "Write a Review", ml: "അഭിപ്രായം എഴുതൂ" })}
          </button>
        </Reveal>

        {reviews.length === 0 ? (
          <Reveal>
            <p className="text-center text-ink/40 text-sm">
              {t({ en: "Be the first to share your experience.", ml: "നിങ്ങളുടെ അനുഭവം ആദ്യം പങ്കുവെക്കൂ." })}
            </p>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.05}>
                <div className="bg-white border border-maroon/10 p-8 h-full flex flex-col">
                  <StarRating value={r.rating} size={16} />
                  <p className="mt-4 text-sm text-ink/70 font-normal leading-relaxed flex-1">"{r.text}"</p>
                  <div className="mt-6 pt-4 border-t border-maroon/10">
                    <p className="text-maroon font-medium text-sm">{r.name}</p>
                    <p className="text-ink/35 text-xs mt-0.5">{formatDate(r.createdAt)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-6"
          onClick={closeModal}
        >
          <div
            className="bg-cream max-w-md w-full p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={t({ en: "Close", ml: "അടയ്ക്കുക" })}
              onClick={closeModal}
              className="absolute top-4 right-4 text-maroon/50 hover:text-maroon text-xl leading-none"
            >
              &times;
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
                  {t({ en: "Thank You", ml: "നന്ദി" })}
                </p>
                <h3 className="text-2xl font-serif font-medium text-maroon mb-3">
                  {t({ en: "Review Received", ml: "അഭിപ്രായം ലഭിച്ചു" })}
                </h3>
                <p className="text-sm text-ink/55 font-normal leading-relaxed">
                  {t({
                    en: "Thanks for sharing your experience. It'll appear here once our team approves it.",
                    ml: "നിങ്ങളുടെ അനുഭവം പങ്കുവെച്ചതിന് നന്ദി. ടീം അംഗീകരിച്ച ശേഷം ഇത് ഇവിടെ ദൃശ്യമാകും.",
                  })}
                </p>
              </div>
            ) : (
              <>
                <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
                  {t({ en: "Share Your Experience", ml: "നിങ്ങളുടെ അനുഭവം പങ്കുവെക്കൂ" })}
                </p>
                <h3 className="text-2xl font-serif font-medium text-maroon mb-6">
                  {t({ en: "Write a Review", ml: "അഭിപ്രായം എഴുതൂ" })}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">
                      {t({ en: "Your Rating", ml: "നിങ്ങളുടെ റേറ്റിംഗ്" })}
                    </label>
                    <StarRating value={rating} onChange={setRating} size={26} />
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
                      className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-2.5 text-lg font-normal transition-colors"
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
                      rows={4}
                      placeholder={t({
                        en: "Tell us about your trip with Al Wafd",
                        ml: "അൽ വഫ്ദിനൊപ്പമുള്ള നിങ്ങളുടെ യാത്രയെക്കുറിച്ച് പറയൂ",
                      })}
                      className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-4 py-3 text-sm outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-8 py-3.5 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors disabled:opacity-50"
                  >
                    {submitting
                      ? t({ en: "Submitting…", ml: "സമർപ്പിക്കുന്നു…" })
                      : t({ en: "Submit Review", ml: "സമർപ്പിക്കൂ" })}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
