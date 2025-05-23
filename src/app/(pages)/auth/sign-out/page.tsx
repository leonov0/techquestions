import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SignOutForm } from "./sign-out-form";

export default function SignOut() {
  return (
    <main className="container max-w-screen-sm">
      <Card>
        <CardHeader>
          <CardTitle>Sign out of your account</CardTitle>
          <CardDescription>
            You will need to sign in again to get full access to our features.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignOutForm />
        </CardContent>
      </Card>
    </main>
  );
}
