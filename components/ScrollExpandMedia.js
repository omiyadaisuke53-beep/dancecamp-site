"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Scroll-to-expand media hero.
 * The media starts small + centered and grows to fill the viewport as the user
 * scrolls; once fully expanded, normal scrolling resumes and `children` reveal.
 *
 * Adapted to JS + the Dance Camp brand, with a bilingual two-line heading and
 * coordination with the global Lenis smooth-scroll instance.
 */
export default function ScrollExpandMedia({
  mediaSrc,
  posterSrc,
  bgImageSrc,
  line1,
  line2,
  scrollToExpand,
  headingFont = "font-display",
  children,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Pause Lenis while the hero owns the scroll; resume once expanded.
  // The parent SmoothScroll effect runs *after* this child effect on mount,
  // so window.__lenis may not exist yet — poll via rAF until it does.
  useEffect(() => {
    let raf;
    const apply = () => {
      const lenis = typeof window !== "undefined" ? window.__lenis : null;
      if (!lenis) {
        raf = requestAnimationFrame(apply);
        return;
      }
      if (mediaFullyExpanded) lenis.start();
      else lenis.stop();
    };
    apply();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (typeof window !== "undefined" && window.__lenis) window.__lenis.start();
    };
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Reduced motion: show the hero already expanded, no scroll hijack.
    if (prefersReduced) {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
      return;
    }

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.002;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.014 : 0.011;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!mediaFullyExpanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);

  return (
    <div id="top" className="overflow-x-hidden">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          {/* Background image — fades out as the media expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {bgImageSrc && (
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                className="h-screen w-screen object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-ink/40" />
          </motion.div>

          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              {/* Expanding media */}
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(22, 32, 27, 0.35)",
                }}
              >
                <div className="pointer-events-none relative h-full w-full">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    role="presentation"
                    aria-hidden="true"
                    className="h-full w-full rounded-2xl object-cover"
                    controls={false}
                    disablePictureInPicture
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-ink/40"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.55 - scrollProgress * 0.35 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {scrollToExpand && (
                  <div className="relative z-10 mt-4 flex flex-col items-center text-center">
                    <p
                      className="label text-bone/70"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  </div>
                )}
              </div>

              {/* Two-line heading — left aligned, drifts apart while expanding */}
              <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start gap-1 px-5 text-left mix-blend-difference md:px-8">
                <motion.h1
                  className={`${headingFont} text-[15vw] font-medium leading-[0.95] tracking-tight text-bone md:text-[8vw]`}
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {line1}
                </motion.h1>
                <motion.h1
                  className={`${headingFont} text-[15vw] font-medium italic leading-[0.95] tracking-tight text-bone md:text-[8vw]`}
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {line2}
                </motion.h1>
              </div>
            </div>

            {/* Content revealed after the media is fully expanded */}
            <motion.section
              className="flex w-full flex-col px-6 py-16 md:px-16 md:py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
