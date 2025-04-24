import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import { FeaturedQuestionList } from "./featured-question-list";
import { FeaturedQuestionListSkeleton } from "./featured-question-list-skeleton";

export default async function Home() {
  const isAuthenticated = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="container">
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

          {!isAuthenticated && (
            <Link
              href="/auth/sign-in"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Join the community
            </Link>
          )}
        </div>
      </section>

      <section className="mt-16">
        <Suspense fallback={<FeaturedQuestionListSkeleton />}>
          <FeaturedQuestionList />
        </Suspense>
      </section>
    </main>
  );
}
