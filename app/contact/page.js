import Nav from "@/components/Nav";
import { Register, Footer } from "@/components/sections";

export default function ContactPage() {
  return (
    <>
      <Nav solid />
      <main className="pt-16">
        <Register />
      </main>
      <Footer />
    </>
  );
}
