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

import { completeProfile } from "../actions/complete-profile";
import { updateUserSchema } from "../schemas";
import type { UpdateUserPayload } from "../types";

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

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      await update({ ...values });
      router.push(redirectTo);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
