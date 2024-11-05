import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header />

      {children}

      <Footer />
    </div>
  );
}
