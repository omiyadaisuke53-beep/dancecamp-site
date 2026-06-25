"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useT } from "@/components/LanguageProvider";
import {
  Reveal,
  Stagger,
  StaggerItem,
  Marquee,
  Photo,
} from "@/components/ui";
import PhotoStack from "@/components/PhotoStack";
import {
  MARQUEE,
  ABOUT,
  PROGRAM,
  FACULTY,
  STAY,
  TICKETS,
  FAQ,
  REGISTER,
  FOOTER,
} from "@/lib/content";

/* ===========================================================================
 * MARQUEE BAND
 * ======================================================================== */
export function MarqueeBand() {
  const { t } = useT();
  return (
    <section aria-hidden="true" className="border-y border-forest/15 bg-forest py-5 text-bone md:py-7">
      <Marquee words={t(MARQUEE.words)} className="text-4xl md:text-6xl" />
    </section>
  );
}

/* ===========================================================================
 * ABOUT
 * ======================================================================== */
export function About() {
  const { t, lang } = useT();
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Bark texture background (landscape) with a light scrim for readability */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/concept-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-bone/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Concept text — left, nudged right */}
          <div className="lg:col-span-7 lg:pl-16">
            <Reveal>
              <p className="label text-forest/50">{t(ABOUT.label)}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className={`mt-6 whitespace-pre-line text-balance text-3xl leading-[1.15] tracking-tight md:text-5xl ${
                  lang === "ja" ? "font-jpserif" : "font-display"
                }`}
              >
                {t(ABOUT.heading)}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className={`mt-8 max-w-xl whitespace-pre-line text-lg leading-relaxed text-forest/75 ${
                  lang === "ja" ? "font-jp" : ""
                }`}
              >
                {t(ABOUT.body)}
              </p>
            </Reveal>
          </div>

          {/* Interactive photo roll — right column, nudged left */}
          <div className="flex justify-center lg:col-span-5 lg:justify-start">
            <Reveal delay={0.1}>
              <PhotoStack />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
 * PROGRAM
 * ======================================================================== */
export function Program() {
  const { t, lang } = useT();
  return (
    <section id="program" className="bg-forest py-24 text-bone md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="label text-coral">{t(PROGRAM.label)}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className={`mt-5 text-5xl tracking-tight md:text-7xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
                {t(PROGRAM.heading)}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16">
          {PROGRAM.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="group grid grid-cols-12 items-baseline gap-4 border-t border-bone/15 py-7 transition-colors hover:bg-bone/[0.04] md:py-9">
                <span className="col-span-12 font-mono text-sm text-bone/50 md:col-span-2">
                  {item.time}
                </span>
                <h3
                  className={`col-span-12 text-3xl transition-transform duration-500 ease-soft group-hover:translate-x-2 md:col-span-5 md:text-4xl ${
                    lang === "ja" ? "font-jpserif" : "font-display italic"
                  }`}
                >
                  {t(item.title)}
                </h3>
                <p className={`col-span-12 text-bone/65 md:col-span-5 ${lang === "ja" ? "font-jp" : ""}`}>
                  {t(item.desc)}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-bone/15" />
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
 * FACULTY
 * ======================================================================== */
export function Faculty() {
  const { t, lang } = useT();
  return (
    <section id="faculty" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="max-w-2xl">
        <Reveal>
          <p className="label text-forest/50">{t(FACULTY.label)}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={`mt-5 text-5xl tracking-tight md:text-7xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
            {t(FACULTY.heading)}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={`mt-6 text-lg text-forest/70 ${lang === "ja" ? "font-jp" : ""}`}>
            {t(FACULTY.intro)}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-forest/15 bg-paper py-24 text-center md:mt-20 md:py-32">
          <p className={`text-4xl tracking-tight md:text-6xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
            {t(FACULTY.comingSoon)}
          </p>
          <p className={`mt-5 max-w-sm text-forest/60 ${lang === "ja" ? "font-jp" : ""}`}>
            {t(FACULTY.comingSoonNote)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ===========================================================================
 * STAY (parallax feature)
 * ======================================================================== */
export function Stay() {
  const { t, lang } = useT();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="stay" ref={ref} className="relative overflow-hidden">
      {/* Full-bleed parallax backdrop */}
      <motion.div style={{ y }} className="absolute inset-0 -z-0 h-[120%]">
        <Photo src="/images/stay.jpg" w={2000} h={1334} alt="The timber lodge in the mountains" className="h-full" priority={false} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/55 to-ink/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 text-bone md:px-8 md:py-48">
        <div className="max-w-xl">
          <Reveal>
            <p className="label text-coral">{t(STAY.label)}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={`mt-5 whitespace-pre-line text-5xl leading-[0.95] tracking-tight md:text-7xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
              {t(STAY.heading)}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={`mt-8 whitespace-pre-line text-lg leading-relaxed text-bone/80 ${lang === "ja" ? "font-jp" : ""}`}>
              {t(STAY.body)}
            </p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-bone/20 sm:grid-cols-2">
            {STAY.features.map((f, i) => (
              <StaggerItem key={i} className="bg-bone/[0.06] px-5 py-4 backdrop-blur-sm">
                <span className={`text-bone/90 ${lang === "ja" ? "font-jp text-sm" : ""}`}>
                  <span className="mr-3 text-coral">—</span>
                  {t(f)}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div className="mt-10 border-t border-bone/20 pt-6">
              <p className="label text-coral">{t(STAY.venue.label)}</p>
              <p className={`mt-3 text-2xl md:text-3xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
                {t(STAY.venue.name)}
              </p>
              <p className={`mt-2 text-base text-bone/70 md:text-lg ${lang === "ja" ? "font-jp" : ""}`}>
                {t(STAY.venue.address)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
 * TICKETS
 * ======================================================================== */
export function Tickets() {
  const { t, lang } = useT();
  return (
    <section id="tickets" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="label text-forest/50">{t(TICKETS.label)}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={`mt-5 text-5xl tracking-tight md:text-7xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
              {t(TICKETS.heading)}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className={`max-w-xs text-sm text-forest/60 ${lang === "ja" ? "font-jp" : ""}`}>
            {t(TICKETS.note)}
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3" gap={0.1}>
        {TICKETS.tiers.map((tier, i) => (
          <StaggerItem key={i}>
            <div
              className={`flex h-full flex-col rounded-lg border p-8 transition-transform duration-500 ease-soft hover:-translate-y-1.5 ${
                tier.featured
                  ? "border-transparent bg-forest text-bone"
                  : "border-forest/15 bg-paper"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">{t(tier.name)}</h3>
                {tier.featured && (
                  <span className="label rounded-full bg-coral px-3 py-1 text-[10px] text-bone">
                    ★
                  </span>
                )}
              </div>
              <p className={`label mt-2 ${tier.featured ? "text-bone/60" : "text-forest/50"}`}>
                {t(tier.sub)}
              </p>
              <p className="mt-6 font-display text-4xl tabular-nums">{tier.price}</p>

              <ul className="mt-7 space-y-3">
                {t(tier.perks).map((perk, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-3 text-sm ${
                      tier.featured ? "text-bone/85" : "text-forest/75"
                    } ${lang === "ja" ? "font-jp" : ""}`}
                  >
                    <span className="mt-0.5 text-coral">✳</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href="#register"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform duration-300 ease-soft hover:scale-[1.03] ${
                  tier.featured
                    ? "bg-coral text-bone"
                    : "bg-forest text-bone"
                }`}
              >
                {t(TICKETS.cta)} →
              </a>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ===========================================================================
 * FAQ
 * ======================================================================== */
export function Faq() {
  const { t, lang } = useT();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-paper">
      {/* Mountain background with a light scrim for legibility */}
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/images/faq-bg.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-paper/90" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="label text-center text-forest/50">{t(FAQ.label)}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={`mt-5 text-center text-5xl tracking-tight md:text-7xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
            {t(FAQ.heading)}
          </h2>
        </Reveal>

        <div className="mt-14">
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-forest/15 last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-xl md:text-2xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
                    {t(item.q)}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/25 text-lg transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-coral text-bone" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className={`max-w-2xl pb-7 text-forest/70 ${lang === "ja" ? "font-jp" : ""}`}>
                        {t(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
 * REGISTER
 * ======================================================================== */
export function Register() {
  const { t, lang } = useT();
  const [form, setForm] = useState({ lastName: "", firstName: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    // Placeholder: wire this up to your email service (Resend, Formspree, etc.).
    setSent(true);
  };

  const inputClass =
    "w-full rounded-lg border border-bone/25 bg-transparent px-5 py-3.5 text-bone placeholder-bone/40 outline-none transition-colors focus:border-coral";

  return (
    <section id="register" className="bg-forest text-bone">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-36">
        <div>
          <Reveal>
            <p className="label text-coral">{t(REGISTER.label)}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={`mt-5 whitespace-pre-line text-6xl leading-[0.9] tracking-tight md:text-8xl ${lang === "ja" ? "font-jpserif" : "font-display"}`}>
              {t(REGISTER.heading)}
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal delay={0.1}>
            <p className={`text-lg text-bone/75 ${lang === "ja" ? "font-jp" : ""}`}>
              {t(REGISTER.body)}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            {sent ? (
              <p className={`mt-8 text-xl text-coral ${lang === "ja" ? "font-jp" : "font-display italic"}`}>
                {t(REGISTER.success)}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label mb-2 block text-bone/55" htmlFor="lastName">
                      {t(REGISTER.form.lastName)}
                    </label>
                    <input id="lastName" type="text" value={form.lastName} onChange={update("lastName")} className={inputClass} />
                  </div>
                  <div>
                    <label className="label mb-2 block text-bone/55" htmlFor="firstName">
                      {t(REGISTER.form.firstName)}
                    </label>
                    <input id="firstName" type="text" value={form.firstName} onChange={update("firstName")} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="label mb-2 block text-bone/55" htmlFor="email">
                    {t(REGISTER.form.email)}
                  </label>
                  <input id="email" type="email" required value={form.email} onChange={update("email")} className={inputClass} />
                </div>
                <div>
                  <label className="label mb-2 block text-bone/55" htmlFor="message">
                    {t(REGISTER.form.message)}
                  </label>
                  <textarea id="message" rows={5} required value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-coral px-8 py-3.5 font-medium text-bone transition-transform duration-300 ease-soft hover:scale-[1.03]"
                >
                  {t(REGISTER.form.send)}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
 * FOOTER
 * ======================================================================== */
export function Footer() {
  const { t, lang } = useT();
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl md:text-5xl">Dance Camp</p>
            <p className={`mt-3 text-bone/60 ${lang === "ja" ? "font-jp" : "font-display italic"}`}>
              {t(FOOTER.tagline)}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER.links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="label text-bone/70 transition-colors hover:text-coral"
              >
                {t(l.label)}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-bone/15 pt-6 text-xs text-bone/45 sm:flex-row">
          <span className={lang === "ja" ? "font-jp" : ""}>{t(FOOTER.rights)}</span>
          <span>© {new Date().getFullYear()} Dance Camp</span>
        </div>
      </div>
    </footer>
  );
}
