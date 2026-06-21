const DEFAULT_PHRASES = [
  'CHAMPION BLOODLINE',
  'LIMITED LITTERS',
  'SHIPS WORLDWIDE',
  'ABKC REGISTERED',
  'THE REAL XL',
  'RAISED IN KUWAIT',
];

/**
 * Full-width scrolling marquee strip — a brutalist signature. Renders the
 * phrase list twice back-to-back so the -50% loop is seamless.
 */
export function Marquee({ phrases = DEFAULT_PHRASES }: { phrases?: string[] }) {
  const row = [...phrases, ...phrases];
  return (
    <div className="
      overflow-hidden border-y border-border bg-primary py-4
      text-primary-foreground select-none
    "
    >
      <div className="
        inline-flex animate-marquee whitespace-nowrap will-change-transform
      "
      >
        {row.map((phrase, i) => (
          <span key={i} className="flex items-center">
            <span className="
              px-6 font-display text-2xl tracking-wide
              md:text-3xl
            "
            >
              {phrase}
            </span>
            <span aria-hidden className="text-xl">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
