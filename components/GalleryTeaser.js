"use client";

import Link from "next/link";
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
} from "@/components/HoverSlider";
import { useT } from "@/components/LanguageProvider";
import { galleries } from "@/lib/galleries";
import MovieEmbed from "@/components/MovieEmbed";

const items = galleries.map((g) => ({
  label: `${g.title} ${g.year}`,
  img: g.images[0],
  href: `/gallery/${g.slug}`,
}));

export default function GalleryTeaser() {
  const { t } = useT();
  return (
    <section id="gallery" className="relative overflow-hidden bg-forest text-bone">
      {/* Forest leaf background with a dark scrim for legibility */}
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/images/gallery-bg.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/80 to-forest/75" />
      </div>
      <HoverSlider className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <p className="font-mono text-sm uppercase tracking-[0.22em] text-coral md:text-base">
          Gallery
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Hover text list */}
          <div className="flex flex-col items-start gap-2">
            {items.map((it, i) => (
              <Link key={it.href} href={it.href} className="w-fit">
                <TextStaggerHover
                  text={it.label}
                  index={i}
                  className="cursor-pointer font-display text-4xl font-medium leading-[1.2] tracking-tight md:text-6xl"
                />
              </Link>
            ))}
            <Link
              href="/gallery"
              className="label mt-8 inline-flex items-center gap-2 text-bone/60 transition-colors hover:text-coral"
            >
              {t({ en: "View all galleries →", ja: "すべてのギャラリーを見る →" })}
            </Link>
          </div>

          {/* Hover-driven image */}
          <div className="lg:justify-self-end">
            <HoverSliderImageWrap className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-ink ring-1 ring-bone/10">
              {items.map((it, i) => (
                <HoverSliderImage
                  key={it.href}
                  index={i}
                  imageUrl={it.img}
                  alt={it.label}
                  className="h-full w-full object-cover"
                />
              ))}
            </HoverSliderImageWrap>
          </div>
        </div>

        {/* Movie */}
        <div className="mt-20 md:mt-28">
          <p className="font-mono text-sm uppercase tracking-[0.22em] text-coral md:text-base">
            Movie
          </p>
          <div className="mt-6">
            <MovieEmbed />
          </div>
        </div>
      </HoverSlider>
    </section>
  );
}
