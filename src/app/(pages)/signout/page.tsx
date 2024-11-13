import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "@/features/auth";

export default function SignOut() {
  return (
    <main className="container max-w-screen-sm py-16">
      <Card>
        <CardHeader>
          <CardTitle>Sign out of your account</CardTitle>

          <CardDescription>
            You will need to sign in again to get full access to our features.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button variant="destructive">
              <ExitIcon />
              <span className="ml-2">Sign out</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
