import { headers } from "next/headers";
import Link from "next/link";

import { TechQuestions } from "@/components/icons/techquestions";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import { Profile } from "./profile";

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="bg-background/60 sticky top-0 z-20 border-b py-4 backdrop-blur">
      <nav className="container flex justify-between gap-6">
        <Link
          href="/"
          className="hover:text-foreground/90 grid place-items-center transition-colors"
          aria-label="Go to homepage"
        >
          <TechQuestions className="size-9" />
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-3">
            <li>
              <Button asChild variant="link">
                <Link href="/questions">Questions</Link>
              </Button>
            </li>
          </ul>

          <div className="border-l pl-6">
            {session ? (
              <Profile initialUser={session.user} />
            ) : (
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
