import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Profile, ProfileLoader } from "@/features/users";

export default function User({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <Suspense fallback={<ProfileLoader />}>
          <Profile params={params} className="motion-preset-focus" />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
