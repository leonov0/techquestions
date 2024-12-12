import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { auth } from "@/features/auth";
import { getRecommendations } from "@/features/questions";

import FeaturedQuestionsSection from "./featured-questions-section";
import { HeroSection } from "./hero-section";

export default async function Home() {
  const session = await auth();

  const recommendedQuestions = await getRecommendations();

  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container">
        <HeroSection isAuthenticated={!!session} />

        <FeaturedQuestionsSection questions={recommendedQuestions.data} />
      </main>

      <Footer />
    </div>
  );
}
