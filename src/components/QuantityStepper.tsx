interface QuantityStepperProps {
  value: number;
  onChange: (v: number) => void;
  label: string;
  description?: string;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  label,
  description,
  min = 1,
  max = 20,
}: QuantityStepperProps) {
  return (
    <div className="w-full flex items-center justify-between gap-6 py-5 text-left">
      <span>
        <span className="block text-base md:text-lg font-serif text-maroon">{label}</span>
        {description && (
          <span className="block text-xs md:text-sm font-light text-ink/45 mt-1">{description}</span>
        )}
      </span>
      <span className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center border border-maroon/25 text-maroon hover:border-gold hover:text-gold-dark transition-colors disabled:opacity-30 disabled:hover:border-maroon/25 disabled:hover:text-maroon"
        >
          &minus;
        </button>
        <span className="w-6 text-center font-serif text-lg text-maroon">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center border border-maroon/25 text-maroon hover:border-gold hover:text-gold-dark transition-colors disabled:opacity-30 disabled:hover:border-maroon/25 disabled:hover:text-maroon"
        >
          +
        </button>
      </span>
    </div>
  );
}
