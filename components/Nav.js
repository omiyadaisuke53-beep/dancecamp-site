"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import { NAV } from "@/lib/content";

function NavLink({ item, dark, onClick, className = "" }) {
  const base = "transition-colors";
  if (item.cta) {
    const cta =
      "inline-flex items-center gap-1 rounded-full bg-coral px-4 py-2 text-bone hover:scale-[1.03] transition-transform duration-300 ease-soft";
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${cta} ${className}`}>
        {item.label}
      </a>
    );
  }
  const color = dark ? "text-bone/80 hover:text-coral" : "text-forest/70 hover:text-coral";
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${base} ${color} ${className}`}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onClick} className={`${base} ${color} ${className}`}>
      {item.label}
    </Link>
  );
}

export default function Nav({ solid = false }) {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // dark = light-on-transparent mode (only on the home hero, before scrolling)
  const dark = !solid && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          dark ? "bg-transparent" : "bg-bone/85 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          {/* Logo + wordmark */}
          <Link href="/" className="group flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Creative Art Village - Aida"
              className={`h-12 w-auto md:h-14 ${dark ? "invert" : ""}`}
            />
            <span
              className={`font-display text-xl font-semibold tracking-tight transition-colors md:text-2xl ${
                dark ? "text-bone" : "text-forest"
              }`}
            >
              Dance Camp
            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden items-center gap-6 xl:flex">
            {NAV.map((item) => (
              <NavLink key={item.label} item={item} dark={dark} className="text-sm" />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Switch language"
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors hover:border-coral hover:text-coral ${
                dark ? "border-bone/30 text-bone/80" : "border-forest/20 text-forest/70"
              }`}
            >
              <span className={lang === "en" ? "text-coral" : ""}>EN</span>
              <span className="opacity-40">/</span>
              <span className={lang === "ja" ? "text-coral" : ""}>日</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center xl:hidden"
            >
              <div className="space-y-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`block h-px w-6 transition-all ${dark ? "bg-bone" : "bg-forest"} ${
                      open && i === 0 ? "translate-y-[7px] rotate-45" : ""
                    } ${open && i === 1 ? "opacity-0" : ""} ${
                      open && i === 2 ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[64px] z-40 border-t border-forest/10 bg-bone/97 backdrop-blur-md xl:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV.filter((i) => !i.cta).map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  dark={false}
                  onClick={() => setOpen(false)}
                  className="border-b border-forest/10 py-4 font-display text-2xl"
                />
              ))}
              {NAV.filter((i) => i.cta).map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  dark={false}
                  onClick={() => setOpen(false)}
                  className="mt-5 justify-center py-3 text-base font-medium"
                />
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
