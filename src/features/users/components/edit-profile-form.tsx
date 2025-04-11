"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

import { updateProfile } from "../actions/update-profile";
import { updateUserSchema } from "../schemas";
import type { UpdateUserPayload } from "../types";

export function EditProfileForm({ username }: { username: string }) {
  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username,
    },
  });

  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  function onSubmit(values: UpdateUserPayload) {
    startTransition(async () => {
      const result = await updateProfile(values);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      await update({ ...values });
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

        <Button type="submit" className="mt-6 w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
