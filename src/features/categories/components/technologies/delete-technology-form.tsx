"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { deleteTechnology } from "../../actions/technologies/delete-technology";
import type { DeleteCategoryPayload } from "../../types";

export function DeleteTechnologyForm({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const form = useForm<DeleteCategoryPayload>({
    defaultValues: {
      name: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      const response = await deleteTechnology(id);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("Technology deleted successfully.");
      router.push("/admin/technologies");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p>
                  Enter the name of the technology <strong>{name}</strong> to
                  confirm deletion:
                </p>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                  {...form.register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value === name || "Name does not match",
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button type="submit" variant="destructive" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
}
