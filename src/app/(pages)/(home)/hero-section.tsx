"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getAppearingMotionVariants } from "./utils";

export function HeroSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="mx-auto mt-32 max-w-xl">
      <motion.h1
        className="text-3xl font-semibold tracking-tight"
        variants={getAppearingMotionVariants(0)}
        initial="hidden"
        animate="visible"
      >
        Master Every Tech Interview
      </motion.h1>

      <motion.p
        className="mt-2 text-lg text-muted-foreground sm:text-xl"
        variants={getAppearingMotionVariants(0.1)}
        initial="hidden"
        animate="visible"
      >
        A community-driven repository of real interview questions from top
        companies. Sort by company, experience level, and technology to prepare
        smarter, not harder.
      </motion.p>

      <motion.div
        className="mt-4 flex gap-4"
        variants={getAppearingMotionVariants(0.2)}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>
    </section>
  );
}
