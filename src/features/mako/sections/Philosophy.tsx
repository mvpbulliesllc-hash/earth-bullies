'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type PhilosophyProps = {
  leftImage?: string;
  rightImage?: string;
};

const Pillar = ({ src, label, translateX }: { src?: string; label: string; translateX: number }) => (
  <div
    className="relative aspect-4/3 overflow-hidden border border-border bg-card"
    style={{ transform: `translate3d(${translateX}%, 0, 0)`, backfaceVisibility: 'hidden' }}
  >
    {src
      ? (
          <img src={src} alt={label} className="size-full object-cover" />
        )
      : (
          <div className="
            size-full bg-linear-to-br from-neutral-800 to-neutral-950
          "
          />
        )}
    <div className="absolute bottom-6 left-6">
      <span className="
        bg-primary px-4 py-2 text-sm font-semibold tracking-wide
        text-primary-foreground uppercase
      "
      >
        {label}
      </span>
    </div>
  </div>
);

/** Two images slide in from the sides over a giant editorial title (adapted). */
export function Philosophy({ leftImage, rightImage }: PhilosophyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [p, setP] = useState(0);

  const update = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const range = ref.current.offsetHeight - window.innerHeight;
    setP(Math.max(0, Math.min(1, -rect.top / range)));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      raf.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [update]);

  return (
    <section className="bg-background">
      <div ref={ref} className="relative" style={{ height: '200vh' }}>
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative w-full">
            <div
              className="
                pointer-events-none absolute inset-0 z-0 flex items-center
                justify-center
              "
              style={{ opacity: 1 - p }}
            >
              <h2 className="
                px-6 text-center font-display text-[11vw] leading-[0.95]
                font-semibold tracking-tight text-foreground uppercase
                md:text-[9vw]
              "
              >
                Champion Bloodline.
                {' '}
                <span className="text-primary">Structure.</span>
                {' '}
                Presence.
              </h2>
            </div>
            <div className="
              relative z-10 grid grid-cols-1 gap-4 px-6
              md:grid-cols-2 md:px-12
              lg:px-20
            "
            >
              <Pillar src={leftImage} label="Champion bloodline" translateX={(1 - p) * -100} />
              <Pillar src={rightImage} label="Structure & presence" translateX={(1 - p) * 100} />
            </div>
          </div>
        </div>
      </div>

      <div className="
        px-6 py-20 text-center
        md:px-12 md:py-28
        lg:px-20 lg:py-32
      "
      >
        <p className="text-xs tracking-widest text-primary uppercase">Our standard</p>
        <p className="
          mx-auto mt-8 max-w-3xl text-3xl/relaxed text-muted-foreground
        "
        >
          We don't chase dreams — we lead them. Every Earth Bullies breeding is chosen with intention: champion
          bloodline, real XL structure, and that unmistakable presence.
        </p>
      </div>
    </section>
  );
}
