interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export default function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-6 py-5 text-left group"
    >
      <span>
        <span className="block text-base md:text-lg font-serif text-maroon">{label}</span>
        {description && (
          <span className="block text-xs md:text-sm font-light text-ink/45 mt-1">{description}</span>
        )}
      </span>
      <span
        className={`relative shrink-0 w-12 h-7 rounded-full transition-colors duration-300 ${
          checked ? "bg-maroon" : "bg-ink/15"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-cream shadow transition-transform duration-300 ${
            checked ? "translate-x-5 bg-gold" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
