import { AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { cn } from "@/lib/utils";

import { getSeniorityLevel } from "../../actions/seniority-levels/get-seniority-level";
import { DeleteSeniorityLevelForm } from "./delete-seniority-level-form";
import { UpdateSeniorityLevelForm } from "./update-seniority-level-form";

export async function ModerateLevelSection({
  params,
  className,
}: {
  params: Promise<{ id: string }>;
  className?: string;
}) {
  const { id } = await params;
  const response = await getSeniorityLevel(id);

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>An error occurred while fetching the level.</AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data === null) {
    notFound();
  }

  return (
    <section className={cn("space-y-8", className)}>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Moderating {response.data.name}
        </h1>
        <code className="text-muted-foreground">{response.data.id}</code>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Seniority Level</CardTitle>
          <CardDescription>
            Enter the new details for the level. Make sure to double-check the
            information before submitting.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateSeniorityLevelForm id={id} defaultValues={response.data} />
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Delete Seniority Level</CardTitle>
          <CardDescription>
            This action is irreversible. Are you sure you want to delete?
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
                  This action cannot be undone. This will permanently delete the
                  company.
                </DialogDescription>
              </DialogHeader>

              <DeleteSeniorityLevelForm id={id} name={response.data.name} />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
