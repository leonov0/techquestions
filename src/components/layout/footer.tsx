import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-muted-foreground py-8 pt-0">
      <div className="container flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} TechQuestions
        </p>

        <div className="space-x-2">
          <Link
            href="/terms"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>

          <span>•</span>

          <Link
            href="/privacy"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
