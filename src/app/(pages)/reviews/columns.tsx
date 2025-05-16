"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Clock, Ellipsis, X } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import type { Question } from "@/database";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "status",
    header: "",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === "pending") {
        return <Clock className="size-4 text-yellow-500" />;
      }

      if (status === "approved") {
        return <Check className="size-4 text-green-500" />;
      }

      if (status === "rejected") {
        return <X className="size-4 text-red-500" />;
      }
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
          Title
        </Button>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
          Updated At
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>
        {row.original.updatedAt.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
          Created At
        </Button>
      );
    },
    cell: ({ row }) => (
      <div suppressHydrationWarning>
        {row.original.createdAt.toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          href={`/reviews/${row.original.id}`}
        >
          <Ellipsis />
        </Link>
      );
    },
  },
];
