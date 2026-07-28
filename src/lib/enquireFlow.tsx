import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { saveCustomer, trackEnquireClick, type EnquirySource } from "./analytics";
import { createOrder, type OrderDetail } from "./orders";
import { useT } from "./i18n";

const NAME_KEY = "wafd_customer_name";

export interface EnquireRequest {
  source: EnquirySource;
  whatsappUrl: string;
  /** Short label shown in the Customers tab (e.g. the preset name). */
  detail?: string;
  /** Structured line items for the full order record admin sees (e.g. "Visa Processing", "Makkah Accommodation — 4 Star"). */
  orderDetails?: OrderDetail[];
  quantity?: number;
}

interface EnquireFlowValue {
  requestEnquire: (req: EnquireRequest) => void;
}

const EnquireFlowContext = createContext<EnquireFlowValue | null>(null);

function proceed(name: string, req: EnquireRequest) {
  void saveCustomer({ name, source: req.source, detail: req.detail });
  void trackEnquireClick();
  void createOrder({
    customerName: name,
    source: req.source,
    quantity: req.quantity ?? 1,
    details: req.orderDetails ?? [],
  });
  window.open(req.whatsappUrl, "_blank", "noopener,noreferrer");
}

export function EnquireFlowProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const pendingRef = useRef<EnquireRequest | null>(null);
  const t = useT();

  function requestEnquire(req: EnquireRequest) {
    const cachedName = window.localStorage.getItem(NAME_KEY);
    if (cachedName) {
      proceed(cachedName, req);
      return;
    }
    pendingRef.current = req;
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || !pendingRef.current) return;
    window.localStorage.setItem(NAME_KEY, trimmedName);
    proceed(trimmedName, pendingRef.current);
    setOpen(false);
    setName("");
    pendingRef.current = null;
  }

  return (
    <EnquireFlowContext.Provider value={{ requestEnquire }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 backdrop-blur-sm px-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-cream max-w-sm w-full p-8 md:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={t({ en: "Close", ml: "അടയ്ക്കുക" })}
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-maroon/50 hover:text-maroon text-xl leading-none"
            >
              &times;
            </button>
            <p className="text-gold-dark text-xs tracking-widest-lg uppercase mb-3">
              {t({ en: "Before You Go", ml: "തുടരുന്നതിന് മുമ്പ്" })}
            </p>
            <h3 className="text-2xl font-serif font-medium text-maroon mb-2">
              {t({ en: "Tell Us Who's Asking", ml: "നിങ്ങളുടെ പേര് നൽകൂ" })}
            </h3>
            <p className="text-sm text-ink/55 font-normal mb-6 leading-relaxed">
              {t({
                en: "So our concierge knows who to reply to on WhatsApp.",
                ml: "വാട്സാപ്പിൽ ആർക്ക് മറുപടി നൽകണം എന്ന് ഞങ്ങളുടെ ടീമിന് അറിയാൻ.",
              })}
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-widest-lg uppercase text-maroon/70 mb-2">
                  {t({ en: "Full Name", ml: "പൂർണ്ണ പേര്" })}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  autoFocus
                  className="w-full bg-transparent border-b border-maroon/25 focus:border-gold outline-none py-2.5 text-lg font-normal transition-colors"
                  placeholder={t({ en: "Your name", ml: "നിങ്ങളുടെ പേര്" })}
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3.5 bg-maroon text-cream text-sm tracking-widest-lg uppercase font-sans hover:bg-maroon-light transition-colors"
              >
                {t({ en: "Continue to WhatsApp", ml: "വാട്സാപ്പിലേക്ക് തുടരുക" })}
              </button>
            </form>
          </div>
        </div>
      )}
    </EnquireFlowContext.Provider>
  );
}

export function useEnquireFlow(): EnquireFlowValue {
  const ctx = useContext(EnquireFlowContext);
  if (!ctx) throw new Error("useEnquireFlow must be used within an EnquireFlowProvider");
  return ctx;
}
