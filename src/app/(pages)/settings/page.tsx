import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/features/auth";
import { EditProfileForm } from "@/features/users";

export default async function Settings() {
  const session = await auth();

  const defaultValues = {
    username: session?.user.username || "",
  };

  return (
    <main className="container max-w-screen-sm py-16">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm {...defaultValues} />
        </CardContent>
      </Card>
    </main>
  );
}
