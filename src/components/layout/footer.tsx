import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-muted-foreground pb-8">
      <div className="container flex flex-col-reverse items-center justify-between gap-2 text-sm sm:flex-row">
        <p>Copyright &copy; {new Date().getFullYear()} TechQuestions</p>

        <div className="space-x-2">
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
      </div>
    </footer>
  );
}
