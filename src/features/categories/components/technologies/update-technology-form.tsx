"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateTechnology } from "../../actions/technologies/update-technology";
import { updateCategorySchema } from "../../schemas";
import type { UpdateCategoryPayload } from "../../types";

export function UpdateTechnologyForm({
  id,
  defaultValues,
}: {
  id: string;
  defaultValues: UpdateCategoryPayload;
}) {
  const form = useForm<UpdateCategoryPayload>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onSubmit(payload: UpdateCategoryPayload) {
    startTransition(async () => {
      const response = await updateTechnology(id, payload);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("Technology updated successfully.");
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
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>

              <FormDescription>
                This is technology display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
