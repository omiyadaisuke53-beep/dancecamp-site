"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useT } from "@/components/LanguageProvider";

const images = [
  "/images/gallery/g01.jpg",
  "/images/gallery/g02.jpg",
  "/images/gallery/g03.jpg",
  "/images/gallery/g04.jpg",
  "/images/gallery/g05.jpg",
  "/images/gallery/g06.jpg",
  "/images/gallery/g07.jpg",
  "/images/gallery/g08.jpg",
  "/images/gallery/g09.jpg",
  "/images/gallery/g10.jpg",
];

// Compact vertical card stack sized to sit inside a content column.
export default function PhotoStack() {
  const { t } = useT();
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

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    }, 3600);
    return () => clearInterval(id);
  }, [paused]);

  const getCardStyle = (index) => {
    const total = images.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    if (diff === -1) return { y: -108, scale: 0.86, opacity: 0.55, zIndex: 4, rotateX: 6 };
    if (diff === -2) return { y: -190, scale: 0.74, opacity: 0.28, zIndex: 3, rotateX: 10 };
    if (diff === 1) return { y: 108, scale: 0.86, opacity: 0.55, zIndex: 4, rotateX: -6 };
    if (diff === 2) return { y: 190, scale: 0.74, opacity: 0.28, zIndex: 3, rotateX: -10 };
    return { y: diff > 0 ? 305 : -305, scale: 0.65, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -14 : 14 };
  };

  const isVisible = (index) => {
    const total = images.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  return (
    <div
      className="flex flex-col items-center gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative flex h-[520px] w-[310px] items-center justify-center sm:w-[340px]"
        style={{ perspective: "1000px" }}
      >
        {images.map((src, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={src}
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
              <div className="relative h-[420px] w-[280px] overflow-hidden rounded-2xl bg-forest shadow-xl ring-1 ring-forest/10 sm:w-[300px]">
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                  loading={isCurrent ? "eager" : "lazy"}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-coral" : "w-2 bg-forest/25 hover:bg-forest/50"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      <span className="label text-forest/40">{t({ en: "Drag to browse", ja: "ドラッグで切り替え" })}</span>
    </div>
  );
}
