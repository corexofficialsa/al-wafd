import { generalEnquiryWhatsappUrl } from "../lib/whatsapp";

const PHONE_DISPLAY = "+966 54 860 9600";
const PHONE_TEL = "+966548609600";

export default function FloatingContact() {
  return (
    <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-50 flex flex-col gap-3">
      <a
        href={generalEnquiryWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Al Wafd on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] shadow-[0_6px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" fill="white" className="w-6 h-6 md:w-7 md:h-7">
          <path d="M16.001 3C9.11 3 3.5 8.61 3.5 15.5c0 2.3.62 4.46 1.71 6.32L3 29l7.36-2.15a12.44 12.44 0 0 0 5.64 1.36h.01c6.89 0 12.5-5.61 12.5-12.5S22.89 3 16.001 3Zm0 22.7h-.01a10.4 10.4 0 0 1-5.31-1.46l-.38-.22-3.94 1.15 1.16-3.86-.25-.4a10.36 10.36 0 0 1-1.6-5.51c0-5.75 4.68-10.43 10.44-10.43 2.79 0 5.41 1.09 7.38 3.06a10.36 10.36 0 0 1 3.06 7.38c0 5.76-4.69 10.29-10.55 10.29Zm5.72-7.65c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55-.18-.01-.39-.01-.6-.01s-.55.08-.84.39c-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
        </svg>
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
      </a>

      <a
        href={`tel:${PHONE_TEL}`}
        aria-label={`Call Al Wafd at ${PHONE_DISPLAY}`}
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-maroon text-gold shadow-[0_6px_24px_rgba(138,0,77,0.35)] transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5 md:w-6 md:h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5.5C3 4.12 4.12 3 5.5 3H8l2 5-2.5 1.5a11 11 0 0 0 6 6L15 13l5 2v2.5c0 1.38-1.12 2.5-2.5 2.5C9.16 20 3 13.84 3 5.5Z"
          />
        </svg>
      </a>
    </div>
  );
}
