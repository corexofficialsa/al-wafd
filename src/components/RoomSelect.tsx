import { AnimatePresence, motion } from "framer-motion";
import type { RoomTier } from "../lib/whatsapp";

const OPTIONS: RoomTier[] = ["None", "1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];

interface RoomSelectProps {
  value: RoomTier;
  onChange: (v: RoomTier) => void;
  label: string;
  description?: string;
  checkIn: string;
  onCheckInChange: (v: string) => void;
  checkOut: string;
  onCheckOutChange: (v: string) => void;
}

export default function RoomSelect({
  value,
  onChange,
  label,
  description,
  checkIn,
  onCheckInChange,
  checkOut,
  onCheckOutChange,
}: RoomSelectProps) {
  const booked = value !== "None";

  return (
    <div className="py-5">
      <label className="block text-base md:text-lg font-serif text-maroon mb-1">{label}</label>
      {description && <p className="text-xs md:text-sm font-light text-ink/45 mb-4">{description}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as RoomTier)}
          className="w-full appearance-none bg-transparent border border-maroon/20 focus:border-gold text-ink px-4 py-3 text-sm tracking-wide outline-none transition-colors cursor-pointer"
        >
          {OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-maroon"
        >
          <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <AnimatePresence initial={false}>
        {booked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-3 py-2.5 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || undefined}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-3 py-2.5 text-sm outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
