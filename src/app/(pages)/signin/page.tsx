import Link from "next/link";

import { GitHub } from "@/components/icons/github";
import { Google } from "@/components/icons/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/features/auth";
import { getCallbackUrl } from "@/lib/utils";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const redirectTo = await getCallbackUrl(searchParams);

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="container max-w-(--breakpoint-sm) py-16">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>

            <CardDescription>
              Sign in with your Google or GitHub account to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="mx-auto grid gap-4 sm:grid-cols-2">
            <form
              action={async () => {
                "use server";

                await signIn("github", { redirectTo });
              }}
            >
              <Button className="w-full">
                <GitHub />
                <span className="ml-2">GitHub</span>
              </Button>
            </form>

            <form
              action={async () => {
                "use server";

                await signIn("google", { redirectTo });
              }}
            >
              <Button className="w-full">
                <Google />
                <span className="ml-2">Google</span>
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-muted-foreground w-full text-center text-sm">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
