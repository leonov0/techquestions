import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

import { TechQuestions } from "@/components/icons/techquestions";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/features/auth";

import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-background/60 sticky top-0 z-50 py-2 backdrop-blur-sm">
      <div className="container flex justify-between gap-8">
        <nav className="flex gap-4">
          <Link
            href="/"
            className="hover:text-foreground/90 grid w-8 place-items-center transition-colors"
            aria-label="Go to the home page"
          >
            <TechQuestions className="size-7" />
          </Link>

          <Link
            href="/questions"
            className={buttonVariants({ variant: "ghost" })}
          >
            Questions
          </Link>
        </nav>

        {session?.user.id ? (
          <ProfileDropdown placeholder={session.user} />
        ) : (
          <div className="flex gap-4">
            <ThemeToggle />

            <Link
              href="/signin"
              className={buttonVariants({ variant: "secondary" })}
            >
              <LogIn />
              Sign in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
