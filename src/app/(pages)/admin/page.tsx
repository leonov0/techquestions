import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function AdminPanel() {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container py-16"></main>

      <Footer />
    </div>
  );
}
