"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateProfile } from "../actions/update-profile";
import { updateUserSchema } from "../../../app/(pages)/users/[id]/schemas";
import { UpdateUserPayload } from "../../../app/(pages)/users/[id]/types";

export function ManageRoleForm({ role }: { role: "user" | "admin" }) {
  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { role },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: UpdateUserPayload) {
    startTransition(async () => {
      const response = await updateProfile(data);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      toast.success("User role updated successfully!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="mt-6 w-full">
          Update Role
        </Button>
      </form>
    </Form>
  );
}
