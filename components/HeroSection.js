"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useT } from "@/components/LanguageProvider";
import { HERO, HERO_VIDEO_URL } from "@/lib/content";

// How much scroll (px) the video takes to fully "iris open".
const SCROLL_HEIGHT = 1500;

export default function HeroSection() {
  const { t, lang } = useT();
  const headingFont = lang === "ja" ? "font-jpserif" : "font-display";

  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  // Autoplay must start muted; the user can opt in to sound with a click.
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setSoundOn(!v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const { scrollY } = useScroll();

  // clip-path polygon: a centered rectangle that expands to the full frame.
  const clipStart = useTransform(scrollY, [0, SCROLL_HEIGHT], [25, 0]);
  const clipEnd = useTransform(scrollY, [0, SCROLL_HEIGHT], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  // Subtle zoom-out as it expands.
  const scale = useTransform(scrollY, [0, SCROLL_HEIGHT + 500], [1.18, 1]);

  return (
    <section id="top" className="relative w-full">
      <div style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }} className="relative w-full">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
          {/* Expanding video (clip-path driven by scroll position).
              pointer-events-none so the full-screen video doesn't block
              touch-scrolling on mobile. */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath, willChange: "clip-path" }}
          >
            <motion.video
              ref={videoRef}
              style={{ scale }}
              className="h-full w-full object-cover"
              poster="/images/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              role="presentation"
              aria-hidden="true"
              disablePictureInPicture
            >
              {HERO_VIDEO_URL && <source src={HERO_VIDEO_URL} type="video/mp4" />}
              <source src="/videos/hero.mp4" type="video/mp4" />
            </motion.video>
            {/* Darken for text legibility — heavier toward the bottom-left */}
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/15 to-transparent" />
          </motion.div>

          {/* Catch copy — anchored bottom-left with generous whitespace */}
          <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl flex-col items-start px-6 pb-16 text-left text-bone md:px-10 md:pb-24">
            <h1 className={`${headingFont} flex flex-col items-start gap-1 lead-tight`}>
              <span className="block text-[10vw] font-medium leading-[0.92] tracking-tight md:text-[5vw]">
                {t(HERO.line1)}
              </span>
              <span className="block text-[10vw] font-medium leading-[0.92] tracking-tight text-coral md:text-[5vw]">
                {t(HERO.line2)}
              </span>
            </h1>

            <p className={`mt-6 max-w-sm text-sm text-bone/75 md:text-base ${lang === "ja" ? "font-jp" : ""}`}>
              {t(HERO.lyric)}
            </p>
          </div>

          {/* Sound on/off — bottom-right, clear of the catch copy */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? "Mute video" : "Unmute video"}
            aria-pressed={soundOn}
            className="absolute bottom-7 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 bg-ink/30 text-bone backdrop-blur-sm transition-colors hover:border-coral hover:text-coral md:right-10"
          >
            {soundOn ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M19 5a9 9 0 0 1 0 14" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
