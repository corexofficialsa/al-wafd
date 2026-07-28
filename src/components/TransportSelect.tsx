import type { TransportMode } from "../lib/whatsapp";
import { useT } from "../lib/i18n";

const OPTIONS: TransportMode[] = ["None", "Train", "Car"];

const OPTION_LABEL: Record<TransportMode, { en: string; ml: string }> = {
  None: { en: "None", ml: "ഒന്നുമില്ല" },
  Train: { en: "Train (Haramain High-Speed)", ml: "ട്രെയിൻ (ഹറമൈൻ)" },
  Car: { en: "Private Car", ml: "സ്വകാര്യ കാർ" },
};

interface TransportSelectProps {
  value: TransportMode;
  onChange: (v: TransportMode) => void;
  label: string;
  description?: string;
}

export default function TransportSelect({ value, onChange, label, description }: TransportSelectProps) {
  const t = useT();

  return (
    <div className="py-5">
      <label className="block text-base md:text-lg font-serif font-medium text-maroon mb-1">{label}</label>
      {description && <p className="text-xs md:text-sm font-normal text-ink/45 mb-4">{description}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as TransportMode)}
          className="w-full appearance-none bg-transparent border border-maroon/20 focus:border-gold text-ink px-4 py-3 text-sm tracking-wide outline-none transition-colors cursor-pointer"
        >
          {OPTIONS.map((o) => (
            <option key={o} value={o}>
              {t(OPTION_LABEL[o])}
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
    </div>
  );
}
