import { EnterIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { TechQuestionsLogoIcon } from "@/components/icons/techquestions-logo-icon";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/features/auth";

import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border border-border/40 bg-background/60 py-2 backdrop-blur">
      <div className="container flex justify-between gap-8">
        <Link
          href="/"
          className="grid w-8 place-items-center transition-colors hover:text-foreground/90"
        >
          <TechQuestionsLogoIcon className="size-7" />
        </Link>

        <div>
          {session ? (
            <ProfileDropdown
              username={session.user.username}
              image={session.user.image}
            />
          ) : (
            <div className="space-x-4">
              <ThemeToggle />

              <Link
                href="/signin"
                className={buttonVariants({ variant: "secondary" })}
              >
                <EnterIcon />
                <span className="ml-2">Sign in</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
