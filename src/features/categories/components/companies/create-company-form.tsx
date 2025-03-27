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

import { createCompany } from "../../actions/companies/create-company";
import { createCategorySchema } from "../../schemas";
import type { CreateCategoryPayload } from "../../types";

export function CreateCompanyForm() {
  const form = useForm<CreateCategoryPayload>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onSubmit(payload: CreateCategoryPayload) {
    startTransition(async () => {
      const response = await createCompany(payload);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("Company created successfully.");
      router.push("/admin/companies");
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

              <FormDescription>This is company display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Create
        </Button>
      </form>
    </Form>
  );
}
