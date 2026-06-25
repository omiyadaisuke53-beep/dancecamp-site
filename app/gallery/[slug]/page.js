import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Footer } from "@/components/sections";
import { ImageGallery } from "@/components/ImageGallery";
import { galleries, getGallery } from "@/lib/galleries";

export const dynamicParams = false;

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const g = getGallery(params.slug);
  if (!g) return {};
  return { title: `${g.title} ${g.year} — Dance Camp Gallery` };
}

export default function CollectionPage({ params }) {
  const g = getGallery(params.slug);
  if (!g) notFound();

  return (
    <>
      <Nav solid />
      <main className="bg-bone pb-24 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link href="/gallery" className="label text-forest/50 transition-colors hover:text-coral">
            ← Gallery
          </Link>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-5">
            <h1 className="font-display text-5xl tracking-tight md:text-7xl">{g.title}</h1>
            <span className="font-mono text-xl text-coral">{g.year}</span>
          </div>
          <p className="mt-4 text-forest/60">{g.images.length} photos</p>
        </div>

        <div className="mt-12 px-5 md:px-8">
          <ImageGallery images={g.images} />
        </div>
      </main>
      <Footer />
    </>
  );
}
