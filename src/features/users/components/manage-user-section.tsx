import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUser } from "../actions/get-user";
import { ManageRolesForm } from "./manage-roles-form";

export async function ManageUserSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getUser(id);

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching user.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data === null) {
    return notFound();
  }
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Manage User&apos;s Roles</CardTitle>
          <CardDescription>
            Manage the roles of the user. You can assign or remove roles as
            needed. User immediately receives or loses permissions based on the
            roles assigned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ManageRolesForm
            userId={response.data.id}
            roles={response.data.role ?? ""}
          />
        </CardContent>
      </Card>
    </section>
  );
}
