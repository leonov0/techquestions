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

import { getTechnology } from "../actions/get-technology";
import { UpdateTechnologyForm } from "./update-technology-form";

export async function UpdateTechnology({ id }: { id: string }) {
  const response = await getTechnology(id);

  if (!response.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>
          An error occurred while fetching the technology.
        </AlertTitle>
        <AlertDescription>{response.error}</AlertDescription>
      </Alert>
    );
  }

  if (response.data === null) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit technology</CardTitle>
        <CardDescription>
          <p>
            {response.data.name} : <span className="font-mono">{id}</span>
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateTechnologyForm id={id} defaultValues={response.data} />
      </CardContent>
    </Card>
  );
}
