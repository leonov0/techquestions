import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="mx-auto mt-32 max-w-xl">
      <h1 className="motion-translate-y-in-50 motion-opacity-in-[0%] text-3xl font-semibold tracking-tight">
        Master Every Tech Interview
      </h1>

      <p className="motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-100 mt-2 text-lg text-muted-foreground sm:text-xl">
        A community-driven repository of real interview questions from top
        companies. Sort by company, experience level, and technology to prepare
        smarter, not harder.
      </p>

      <div className="motion-translate-y-in-50 motion-opacity-in-[0%] motion-delay-300 mt-4 flex gap-4">
        <Link
          href="/questions"
          className={cn(buttonVariants(), "sm:h-10 sm:px-8")}
        >
          Explore Questions
        </Link>

        {!isAuthenticated && (
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "sm:h-10 sm:px-8",
            )}
          >
            Join the Community
          </Link>
        )}
      </div>
    </section>
  );
}
