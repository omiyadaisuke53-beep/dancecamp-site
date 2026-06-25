import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import GalleryTeaser from "@/components/GalleryTeaser";
import { About, Faq, Footer } from "@/components/sections";

export default function Page() {
  return (
    <>
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
