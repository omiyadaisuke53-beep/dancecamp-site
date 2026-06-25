import Nav from "@/components/Nav";
import { Faculty, Footer } from "@/components/sections";

export default function FacilitatorPage() {
  return (
    <>
      <Nav solid />
      <main className="pt-20">
        <Faculty />
      </main>
      <Footer />
    </>
  );
}
