"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useT } from "@/components/LanguageProvider";

const images = [
  { id: 1, src: "/images/gallery/g01.jpg" },
  { id: 2, src: "/images/gallery/g02.jpg" },
  { id: 3, src: "/images/gallery/g03.jpg" },
  { id: 4, src: "/images/gallery/g04.jpg" },
  { id: 5, src: "/images/gallery/g05.jpg" },
  { id: 6, src: "/images/gallery/g06.jpg" },
  { id: 7, src: "/images/gallery/g07.jpg" },
  { id: 8, src: "/images/gallery/g08.jpg" },
  { id: 9, src: "/images/gallery/g09.jpg" },
  { id: 10, src: "/images/gallery/g10.jpg" },
];

export default function VerticalImageStack() {
  const { t, lang } = useT();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const lastNav = useRef(0);
  const cooldown = 400;

  const navigate = useCallback((dir) => {
    const now = Date.now();
    if (now - lastNav.current < cooldown) return;
    lastNav.current = now;
    setCurrentIndex((prev) => {
      if (dir > 0) return prev === images.length - 1 ? 0 : prev + 1;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, []);

  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.y < -threshold) navigate(1);
    else if (info.offset.y > threshold) navigate(-1);
  };

  // Gentle autoplay; pauses while hovering / dragging.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3800);
    return () => clearInterval(id);
  }, [paused]);

  const getCardStyle = (index) => {
    const total = images.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    if (diff === -1) return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 };
    if (diff === -2) return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 };
    if (diff === 1) return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 };
    if (diff === 2) return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 };
    return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 };
  };

  const isVisible = (index) => {
    const total = images.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  return (
    <section
      id="gallery"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink text-bone"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Heading */}
      <div className="pointer-events-none absolute left-6 top-16 z-10 md:left-10 md:top-24">
        <p className="label text-coral">{t({ en: "( moments )", ja: "（ 記録 ）" })}</p>
        <h2 className={`mt-4 text-4xl tracking-tight md:text-5xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
          {t({ en: "Moments", ja: "キャンプの記録" })}
        </h2>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/[0.03] blur-3xl" />
      </div>

      {/* Card stack */}
      <div
        className="relative flex h-[500px] w-[320px] items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragStart={() => setPaused(true)}
              onDragEnd={handleDragEnd}
              style={{ transformStyle: "preserve-3d", zIndex: style.zIndex }}
            >
              <div className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-forest ring-1 ring-bone/15">
                <img
                  src={image.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                  loading={isCurrent ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:right-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-6 bg-coral" : "h-2 bg-bone/30 hover:bg-bone/60"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-10">
        <div className="flex flex-col items-center">
          <span className="font-display text-4xl tabular-nums text-bone">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-2 h-px w-8 bg-bone/20" />
          <span className="text-sm tabular-nums text-bone/50">
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="label text-bone/45">
          {t({ en: "Drag to browse", ja: "ドラッグで切り替え" })}
        </span>
      </div>
    </section>
  );
}
