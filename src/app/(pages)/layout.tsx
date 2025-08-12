import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";

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
