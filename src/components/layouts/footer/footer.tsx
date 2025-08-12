import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="pb-8">
      <div className="container flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <div className="text-muted-foreground space-x-2">
          <Link
            href="/terms"
            className="font-medium underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>

          <span>•</span>

          <Link
            href="/privacy"
            className="font-medium underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="link" size="sm">
            <Link
              href="https://github.com/leonov0/techquestions"
              target="_blank"
            >
              View on GitHub
              <ArrowUpRight />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
