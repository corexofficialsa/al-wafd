import { useEffect, useMemo, useRef, useState } from "react";
import type { Airport } from "../lib/airports";

interface AirportAutocompleteProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}

function rank(a: Airport, needle: string): number {
  const code = a.code.toLowerCase();
  const city = a.city.toLowerCase();
  const name = a.name.toLowerCase();
  const country = a.country.toLowerCase();
  if (code === needle) return 0;
  if (code.startsWith(needle)) return 1;
  if (city.startsWith(needle)) return 2;
  if (name.startsWith(needle)) return 3;
  if (code.includes(needle) || city.includes(needle) || name.includes(needle) || country.includes(needle)) return 4;
  return -1;
}

// The full airport list is ~6,000 entries (~500KB) — loaded on demand the
// first time this field is used, rather than bundled into every page load.
let airportsPromise: Promise<Airport[]> | null = null;
function loadAirports(): Promise<Airport[]> {
  if (!airportsPromise) {
    airportsPromise = import("../lib/airports").then((mod) => mod.AIRPORTS);
  }
  return airportsPromise;
}

export default function AirportAutocomplete({ value, onChange, label, placeholder }: AirportAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [airports, setAirports] = useState<Airport[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAirports().then(setAirports);
  }, []);

  const results = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle || !airports) return [];
    return airports
      .map((a) => ({ a, score: rank(a, needle) }))
      .filter((r) => r.score >= 0)
      .sort((x, y) => x.score - y.score)
      .slice(0, 8)
      .map((r) => r.a);
  }, [value, airports]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectAirport(a: Airport) {
    onChange(`${a.city} (${a.code})`);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-[11px] tracking-widest-lg uppercase text-maroon/50 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full bg-transparent border border-maroon/20 focus:border-gold text-ink px-3 py-2.5 text-sm outline-none transition-colors"
      />
      {open && value.trim() && (results.length > 0 || !airports) && (
        <div className="absolute z-30 left-0 right-0 mt-1 bg-cream border border-maroon/20 shadow-lg max-h-56 overflow-y-auto">
          {!airports && <p className="px-3 py-2 text-sm text-ink/40">Loading airports…</p>}
          {airports &&
            results.map((a) => (
              <button
                key={a.code}
                type="button"
                onClick={() => selectAirport(a)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-maroon/5 transition-colors flex items-center justify-between gap-3"
              >
                <span className="text-ink/75 truncate">
                  {a.city} <span className="text-ink/40">— {a.name}</span>
                </span>
                <span className="text-gold-dark font-medium shrink-0">{a.code}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
