import { Undo2 } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-4">
        <span className="text-2xl leading-12">404</span>
        <Separator orientation="vertical" />
        <h1>This page could not be found.</h1>
      </div>

      <Link href="/" className={buttonVariants({ size: "lg" })}>
        <Undo2 />
        Back to Home
      </Link>
    </main>
  );
}
