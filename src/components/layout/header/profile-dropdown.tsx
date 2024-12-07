import {
  ChevronDownIcon,
  ExitIcon,
  GearIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getCapitalizedFirstLetter } from "@/lib/utils";

import { DropdownMenuThemesSubContent } from "./dropdown-menu-themes-sub-content";

export function ProfileDropdown({
  username,
  image,
}: {
  username?: string | null;
  image?: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "group max-w-40 space-x-2 pl-2",
        )}
      >
        <Avatar className="size-5 rounded-sm">
          <AvatarImage src={image ?? undefined} />

          <AvatarFallback className="rounded-sm">
            {username && getCapitalizedFirstLetter(username)}
          </AvatarFallback>
        </Avatar>

        <span className="line-clamp-1">{username}</span>

        <ChevronDownIcon
          className="relative top-[1px] size-3 transition duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/users/${username}`}>
            <PersonIcon />
            <span className="ml-2">Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <GearIcon />
            <span className="ml-2">Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunIcon className="dark:hidden" />
            <MoonIcon className="hidden dark:block" />
            <span className="ml-2">Themes</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuThemesSubContent />
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem asChild>
          <Link href="/signout">
            <ExitIcon />
            <span className="ml-2">Sign out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
