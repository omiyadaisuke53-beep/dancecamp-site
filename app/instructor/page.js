import Nav from "@/components/Nav";
import { Faculty, Footer } from "@/components/sections";

export const metadata = {
  title: "Instructor",
  description:
    "Dance Camp の講師。共に学び、身体を導き、自然へと近づく仲間。今年度の講師陣は準備中です。",
};

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
