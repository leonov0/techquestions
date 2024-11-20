import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/features/auth";

import { CompleteProfileForm } from "./form";

export default async function CompleteProfile({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();

  const redirectTo = (await searchParams).callbackUrl;

  if (!session || !session.user.username) {
    throw new Error("Not authenticated");
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <Card>
          <CardHeader>
            <CardTitle>Complete your profile</CardTitle>

            <CardDescription>
              Please fill out the following information to complete your
              profile.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CompleteProfileForm
              username={session.user.username}
              redirectTo={redirectTo}
            />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
