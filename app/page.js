import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import GalleryTeaser from "@/components/GalleryTeaser";
import { About, Faq, Footer } from "@/components/sections";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Dance Camp 2026",
  startDate: "2026-09-18",
  endDate: "2026-09-20",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "四賀環境学習の森",
    address: {
      "@type": "PostalAddress",
      streetAddress: "中川1915-1",
      addressLocality: "松本市",
      addressRegion: "長野県",
      addressCountry: "JP",
    },
  },
  image: ["https://mumudancecamp.com/og.jpg"],
  description:
    "自然の中で身体をひらき、感覚を取り戻す3日間のダンスリトリート。",
  url: "https://mumudancecamp.com",
  organizer: {
    "@type": "Organization",
    name: "Creative Art Village - Aida",
    url: "https://mumudancecamp.com",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Nav />
      <main>
        <HeroSection />
        <About />
        <GalleryTeaser />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
