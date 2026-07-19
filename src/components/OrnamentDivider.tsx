export default function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="w-10 h-px bg-gold/50" />
      <svg viewBox="0 0 24 24" className="w-3 h-3 text-gold rotate-45">
        <rect x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="w-10 h-px bg-gold/50" />
    </div>
  );
}
