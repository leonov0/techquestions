"use client";

import { saveAs } from "file-saver";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUserData } from "./actions";

export default function ExportData() {
  const [isPending, startTransition] = useTransition();

  function handleExport() {
    startTransition(async () => {
      const response = await getUserData();

      if (response.success === false) {
        toast.error(response.error);
        return;
      }

      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: "application/json",
      });

      saveAs(blob, "user-data.json");
    });
  }

  return (
    <main className="container max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Export Your Data</CardTitle>
          <CardDescription>
            Click the button below to export your data in JSON format. This will
            include all your personal information, sessions, accounts,
            questions, comments you posted, and votes you made.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={handleExport} disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Export
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
