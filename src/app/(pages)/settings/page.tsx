import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/features/auth";
import { DeleteProfileForm, EditProfileForm } from "@/features/users";

export default async function Settings() {
  const session = await auth();

  const defaultValues = {
    name: session?.user.name || "",
    username: session?.user.username || "",
  };

  return (
    <main className="container max-w-screen-sm space-y-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>
            Update your profile information. This will be reflected in your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm {...defaultValues} />
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Delete Profile</CardTitle>
          <CardDescription>
            This action will permanently delete your profile. Your submitted
            questions will become anonymous. Are you sure you want to continue?
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>

                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your profile.
                </DialogDescription>
              </DialogHeader>

              <DeleteProfileForm />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </main>
  );
}
