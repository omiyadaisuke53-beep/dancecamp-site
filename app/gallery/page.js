import Link from "next/link";
import Nav from "@/components/Nav";
import { Footer } from "@/components/sections";
import { galleries } from "@/lib/galleries";

export const metadata = {
  title: "Gallery",
  description:
    "Dance Camp の記録 — 風の音、土の感触、響き合う身体。Dance Retreat 2023 / Dance Camp 2024・2025 の写真ギャラリー。",
};

export default function GalleryIndexPage() {
  return (
    <>
      <Nav solid />
      <main className="bg-bone pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h1 className="font-display text-5xl tracking-tight md:text-7xl">Gallery</h1>
          <p className="mt-5 max-w-md whitespace-pre-line font-jp text-forest/70">
            {"風の音、土の感触、響き合う身体。\nDance Campで重ねてきた記憶の断片たち。"}
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((g) => (
              <Link key={g.slug} href={`/gallery/${g.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-forest/5 ring-1 ring-forest/10">
                  <div style={{ aspectRatio: "4 / 5" }}>
                    <img
                      src={g.images[0]}
                      alt={`${g.title} ${g.year}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h2 className="font-display text-2xl tracking-tight">{g.title}</h2>
                  <span className="font-mono text-sm text-forest/50">{g.year}</span>
                </div>
                <p className="label mt-2 text-coral">{g.images.length} photos →</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
