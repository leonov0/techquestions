import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { auth } from "@/features/auth";
import {
  FeaturedQuestionList,
  FeaturedQuestionListLoader,
} from "@/features/questions";

import { HeroSection } from "./hero-section";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid min-h-dvh grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container py-16">
        <HeroSection isAuthenticated={!!session} />

        <section className="mt-16">
          <Suspense fallback={<FeaturedQuestionListLoader />}>
            <FeaturedQuestionList />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
