"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
import { updateUserSchema } from "@/features/users/schemas";
import type { UpdateUserPayload } from "@/features/users/types";

import { completeProfile } from "./actions";

export function CompleteProfileForm({
  username,
  redirectTo = "/",
}: {
  username: string;
  redirectTo?: string;
}) {
  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { username },
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { update } = useSession();

  function onSubmit(values: UpdateUserPayload) {
    startTransition(async () => {
      const result = await completeProfile(values);

      if (result.success) {
        await update({ ...values });
        return router.push(redirectTo);
      }

      toast.error(result.message);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input placeholder={username} {...field} />
              </FormControl>

              <FormDescription>
                This is unique name to identify you on our platform.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-6" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 animate-spin" size={15} />}
          <span>Save</span>
        </Button>
      </form>
    </Form>
  );
}
