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
import { cn } from "@/lib/utils";

import { getUser } from "../actions/get-user";
import { ManageRoleForm } from "./manage-role-form";

export async function ManageUserSection({
  params,
  className,
}: {
  params: Promise<{ id: string }>;
  className?: string;
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

  if (!response.data) {
    notFound();
  }

  return (
    <section className={cn("space-y-8", className)}>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Moderating {response.data.username}
        </h1>
        <code className="text-muted-foreground">{response.data.id}</code>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>
            Manage the roles of this user. You can change the roles of this user
            to give them different permissions in the system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ManageRoleForm role={response.data.role ?? "user"} />
        </CardContent>
      </Card>
    </section>
  );
}
