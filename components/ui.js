"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EVENT } from "@/lib/content";

/* ----------------------------------------------------------------------------
 * Reveal — fade + rise as the element scrolls into view.
 * -------------------------------------------------------------------------- */
export function Reveal({ children, delay = 0, y = 18, className = "", as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------------------
 * Stagger — container that reveals its children one after another.
 * -------------------------------------------------------------------------- */
export function Stagger({ children, className = "", gap = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 16 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(5px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
 * Marquee — kinetic running band of words. Pure CSS animation (perf-friendly),
 * disabled under prefers-reduced-motion via the global media query.
 * -------------------------------------------------------------------------- */
export function Marquee({ words = [], className = "" }) {
  // Duplicate the sequence so the -50% translate loops seamlessly.
  const sequence = [...words, ...words, ...words, ...words];
  const doubled = [...sequence, ...sequence];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className="flex shrink-0 animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display italic">{w}</span>
            <span className="mx-6 text-coral md:mx-10" aria-hidden="true">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Countdown — days/hours/minutes until the event start.
 * -------------------------------------------------------------------------- */
function diff(target) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return { d, h, m };
}

export function Countdown({ labels, light = false }) {
  const target = new Date(EVENT.startDate).getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 30000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: t.d, l: labels.days },
    { v: t.h, l: labels.hours },
    { v: t.m, l: labels.minutes },
  ];

  return (
    <div className="flex items-stretch gap-px overflow-hidden rounded-sm">
      {cells.map((c, i) => (
        <div
          key={i}
          className={`flex flex-col items-center px-4 py-3 backdrop-blur-sm sm:px-6 ${
            light ? "bg-bone/10 text-bone" : "bg-forest/5"
          }`}
        >
          <span className="font-display text-3xl tabular-nums leading-none sm:text-4xl">
            {mounted ? String(c.v).padStart(2, "0") : "--"}
          </span>
          <span className={`label mt-2 ${light ? "text-bone/60" : "text-forest/55"}`}>
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Photo — duotone-treated placeholder image (reliable Lorem Picsum source).
 * Swap the `src` for real dance photography; the duotone keeps everything
 * visually cohesive regardless of the underlying photo.
 * -------------------------------------------------------------------------- */
export function Photo({ seed, src, w = 800, h = 1000, alt = "", tone = "", className = "", priority = false }) {
  const finalSrc = src || `https://picsum.photos/seed/${seed}/${w}/${h}`;
  return (
    <div className={`duotone ${tone} ${className}`}>
      <img
        src={finalSrc}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ aspectRatio: `${w} / ${h}` }}
      />
    </div>
  );
}
