import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseToString } from "@/lib/utils";

import { SignInWithGitHubForm } from "./signin-with-github-form";
import { SignInWithGoogleForm } from "./signin-with-google";

export async function SignInForm({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const redirectTo = parseToString(params.callbackUrl);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>

        <CardDescription>
          Sign in with your Google or GitHub account to continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <SignInWithGoogleForm redirectTo={redirectTo} />
        <SignInWithGitHubForm redirectTo={redirectTo} />
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
  );
}
