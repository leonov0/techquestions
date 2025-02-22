import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight motion-translate-y-in-50 motion-opacity-in-[0%]">
        Master Every Tech Interview
      </h1>

      <p className="mt-2 text-lg text-muted-foreground motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-100 sm:text-xl">
        A community-driven repository of real interview questions from top
        companies. Sort by company, experience level, and technology to prepare
        smarter, not harder.
      </p>

      <div className="mt-4 flex gap-4 motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-300">
        <Link
          href="/questions"
          className={cn(buttonVariants(), "sm:h-10 sm:px-8")}
        >
          Explore questions
        </Link>

        {!isAuthenticated && (
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "sm:h-10 sm:px-8",
            )}
          >
            Join the community
          </Link>
        )}
      </div>
    </section>
  );
}
