import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { GoogleLogoIcon } from "@/components/icons/google-logo-icon";
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

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const redirectTo = (await searchParams).callbackUrl;

  return (
    <main className="container max-w-screen-sm py-16">
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
              <GitHubLogoIcon />
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
              <GoogleLogoIcon />
              <span className="ml-2">Google</span>
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
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
  );
}