import { Suspense } from "react";

import { auth } from "@/features/auth";
import {
  FeaturedQuestionList,
  FeaturedQuestionListLoader,
} from "@/widgets/featured-question-list";

import { HeroSection } from "./hero-section";

export default async function Home() {
  const session = await auth();

  return (
    <main className="container py-16">
      <HeroSection isAuthenticated={!!session} />

      <section className="mt-16">
        <Suspense fallback={<FeaturedQuestionListLoader />}>
          <FeaturedQuestionList />
        </Suspense>
      </section>
    </main>
  );
}
