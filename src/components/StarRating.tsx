import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}

export default function StarRating({ value, onChange, size = 20 }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const interactive = Boolean(onChange);
  const shown = hover ?? value;

  return (
    <div className={`flex gap-1 ${interactive ? "cursor-pointer" : ""}`} onMouseLeave={() => setHover(null)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          tabIndex={interactive ? 0 : -1}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          className={interactive ? "" : "pointer-events-none"}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={n <= shown ? "#E8B73E" : "none"}
            stroke="#E8B73E"
            strokeWidth="1.2"
          >
            <path d="M10 1.5l2.47 5.27 5.78.65-4.32 3.94 1.2 5.71L10 14.9l-5.13 2.17 1.2-5.71-4.32-3.94 5.78-.65L10 1.5z" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}
