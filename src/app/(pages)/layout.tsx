import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto] gap-16">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
