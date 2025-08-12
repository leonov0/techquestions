import { ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";

import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button } from "@/components/ui/button";

import { FEATURED_CATEGORIES } from "./featured-categories";
import { TRANSITION_VARIANTS } from "./transition-variants";

export default function Home() {
  return (
    <main>
      <section className="container mx-auto max-w-xl">
        <TextEffect
          className="text-center text-6xl text-balance"
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
        >
          Master Every Tech Interview
        </TextEffect>

        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mt-8 text-center text-lg text-balance"
        >
          A community-driven repository of real interview questions from top
          companies. Sort by company, experience level, and technology to
          prepare smarter, not harder.
        </TextEffect>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...TRANSITION_VARIANTS,
          }}
          className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/questions">
              Explore Questions
              <ChevronRight />
            </Link>
          </Button>

          <Button asChild variant="secondary" size="lg">
            <Link href="/auth/sign-up">
              <LogIn />
              Join the Community
            </Link>
          </Button>
        </AnimatedGroup>
      </section>

      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.75,
              },
            },
          },
          ...TRANSITION_VARIANTS,
        }}
      >
        <section className="relative mt-16">
          <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.gray.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.gray.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
          <div className="absolute inset-x-0 top-12 -z-1 mx-auto h-1/3 w-2/3 rounded-full bg-blue-300 blur-3xl dark:bg-white/20"></div>

          <div>
            <ul className="container grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
              {FEATURED_CATEGORIES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="bg-background flex h-44 flex-col justify-center gap-1 rounded-xl border p-9 text-center shadow-sm"
                  >
                    <h3 className="text-3xl">{link.title}</h3>
                    <p className="text-muted-foreground text-balance">
                      {link.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </AnimatedGroup>
    </main>
  );
}
