'use client';

import { useEffect, useRef, useState } from 'react';
import { Brand } from '../Brand';

const WORD = 'EARTH';

const TRUST = ['ABKC Registered', 'Worldwide Shipping', 'KKC Shows', 'Health Guaranteed'];

type HeroProps = {
  centerImage?: string;
  leftImages?: string[];
  rightImages?: string[];
  tagline?: string;
};

const ImgOrPlaceholder = ({ src, alt }: { src?: string; alt: string }) =>
  src
    ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 size-full object-cover"
        />
      )
    : (
        <div className="
          absolute inset-0 size-full bg-linear-to-br from-neutral-700
          to-neutral-900
        "
        />
      );

/**
 * Scroll-driven "bento" hero adapted from the UI template: a full-bleed center
 * image holds the EARTH wordmark, then on scroll it contracts to reveal flanking
 * image columns.
 */
export function Hero({ centerImage, leftImages = [], rightImages = [], tagline }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) {
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = window.innerHeight * 2;
      setProgress(Math.max(0, Math.min(1, -rect.top / scrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textOpacity = Math.max(0, 1 - progress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));
  const centerWidth = 100 - imageProgress * 58;
  const centerHeight = 100 - imageProgress * 30;
  const sideWidth = imageProgress * 22;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = 0; // brutalist — sharp corners throughout
  const gap = imageProgress * 16;
  const sideTranslateY = -(imageProgress * 15);

  const left = leftImages.slice(0, 2);
  const right = rightImages.slice(0, 2);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex size-full items-center justify-center">
          <div
            className="relative flex size-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + imageProgress * 40}px` }}
          >
            {/* Left column */}
            <div
              className="flex flex-col will-change-transform"
              style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`, opacity: imageProgress }}
            >
              {left.map((img, i) => (
                <div key={i} className="relative flex-1 overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
                  <ImgOrPlaceholder src={img} alt="Earth Bullies XL American Bully" />
                </div>
              ))}
            </div>

            {/* Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{ width: `${centerWidth}%`, height: `${centerHeight}%`, flex: '0 0 auto', borderRadius: `${borderRadius}px` }}
            >
              <ImgOrPlaceholder src={centerImage} alt="Earth Bullies XL American Bully" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-end overflow-hidden">
                <h1 className="
                  w-full font-display text-[24vw] leading-[0.8] font-semibold
                  tracking-tighter text-white
                "
                >
                  {WORD.split('').map((letter, i) => (
                    <span
                      key={i}
                      className="
                        inline-block animate-[slideUp_0.8s_ease-out_forwards]
                        opacity-0
                      "
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
              <div
                className="absolute top-1/2 left-1/2 -translate-1/2 text-center"
                style={{ opacity: textOpacity }}
              >
                <p className="
                  text-xs font-semibold tracking-[0.3em] text-white/80 uppercase
                  md:text-sm
                "
                >
                  {Brand.registry}
                  {' '}
                  ·
                  {' '}
                  {Brand.location}
                  {' '}
                  · Since
                  {' '}
                  {Brand.since}
                </p>
              </div>
            </div>

            {/* Right column */}
            <div
              className="flex flex-col will-change-transform"
              style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`, opacity: imageProgress }}
            >
              {right.map((img, i) => (
                <div key={i} className="relative flex-1 overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
                  <ImgOrPlaceholder src={img} alt="Earth Bullies XL American Bully" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space that drives the animation */}
      <div className="h-[200vh]" />

      <div className="
        px-6 pt-32 pb-28
        md:px-12 md:pt-48 md:pb-36
        lg:px-20 lg:pt-56 lg:pb-44
      "
      >
        <p className="
          mx-auto max-w-2xl text-center text-2xl/relaxed text-muted-foreground
          md:text-3xl
          lg:text-[2.5rem] lg:leading-snug
        "
        >
          {tagline}
        </p>

        <ul className="
          mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center
          gap-x-6 gap-y-3 text-xs font-semibold tracking-[0.2em] uppercase
        "
        >
          {TRUST.map((item, i) => (
            <li key={item} className="flex items-center gap-6">
              <span className="text-foreground">{item}</span>
              {i < TRUST.length - 1 && <span className="text-primary">◆</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
