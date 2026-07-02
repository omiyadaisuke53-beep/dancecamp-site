import Nav from "@/components/Nav";
import { Register, Footer } from "@/components/sections";

export const metadata = {
  title: "Contact",
  description: "Dance Camp へのお問い合わせ・ご連絡はこちらから。",
};

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
