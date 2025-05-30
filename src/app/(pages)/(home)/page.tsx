import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";

import { FeaturedQuestionList } from "./featured-question-list";
import { FeaturedQuestionListLoader } from "./featured-question-list-loader";
import { PopularCategoriesList } from "./popular-categories-list";
import { SignInActionLink } from "./sign-in-action-link";

export default function Home() {
  return (
    <main className="container space-y-16">
      <section className="mx-auto max-w-xl">
        <h1 className="motion-translate-y-in-50 motion-opacity-in-[0%] text-3xl font-semibold tracking-tight">
          Master Every Tech Interview
        </h1>

        <p className="text-muted-foreground motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-100 mt-2 text-lg sm:text-xl">
          A community-driven repository of real interview questions from top
          companies. Sort by company, experience level, and technology to
          prepare smarter, not harder.
        </p>

        <div className="motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-300 mt-4 flex gap-4">
          <Link href="/questions" className={buttonVariants({ size: "lg" })}>
            Explore questions
          </Link>

          <SignInActionLink
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Join the community
          </SignInActionLink>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          🔥 Hot Questions
        </h2>

        <Suspense fallback={<FeaturedQuestionListLoader />}>
          <FeaturedQuestionList />
        </Suspense>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          ⭐ Popular Categories
        </h2>

        <Suspense fallback={<FeaturedQuestionListLoader />}>
          <PopularCategoriesList />
        </Suspense>
      </section>
    </main>
  );
}
