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
import { CompleteProfileForm } from "@/features/users";
import { parseToString } from "@/lib/utils";

export default async function CompleteProfile({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const session = await auth();

  if (!session?.user.username) {
    throw new Error("Unauthorized.");
  }

  const params = await searchParams;

  const redirectTo = parseToString(params.callbackUrl);

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
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
