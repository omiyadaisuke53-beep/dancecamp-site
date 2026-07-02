import Nav from "@/components/Nav";
import { Stay, Footer } from "@/components/sections";

export const metadata = {
  title: "Venue",
  description:
    "会場「四賀環境学習の森」（長野県松本市中川1915-1）。山に包まれる住処で過ごす3日間。",
};

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
