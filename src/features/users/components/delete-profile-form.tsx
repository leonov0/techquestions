"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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

import { deleteProfile } from "../actions/delete-profile";
import type { DeleteUserPayload } from "../types";

export function DeleteProfileForm() {
  const session = useSession();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<DeleteUserPayload>({
    defaultValues: {
      username: "",
    },
  });

  function onSubmit() {
    startTransition(async () => {
      const response = await deleteProfile();

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("Profile deleted successfully. Redirecting...");

      router.push("/");
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
              <FormLabel>
                Enter your username to confirm deletion of your profile:
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  {...form.register("username", {
                    required: "Username is required",
                    validate: (value) =>
                      value === session.data?.user.username ||
                      "Username does not match",
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
