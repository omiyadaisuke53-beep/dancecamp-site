import Nav from "@/components/Nav";
import { Stay, Footer } from "@/components/sections";

export default function AccessPage() {
  return (
    <>
      <Nav solid />
      <main className="pt-16">
        <Stay />
      </main>
      <Footer />
    </>
  );
}
