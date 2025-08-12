"use client";

import { UserAvatar } from "@daveyplate/better-auth-ui";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

type UserProfile = {
  name: string;
  image?: string | null;
  username: string;
  displayUsername: string;
};

export function Profile({ initialUser }: { initialUser: UserProfile }) {
  const [user, setUser] = useState<UserProfile>(initialUser);

  const session = authClient.useSession();

  useEffect(() => {
    // HACK: Auth client returns invalid User type
    if (session.data) setUser(session.data.user as UserProfile);
  }, [session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="group space-x-2 pl-2" variant="secondary">
          <UserAvatar user={user} className="size-5 rounded-sm" />

          <p className="max-w-16 truncate overflow-hidden whitespace-nowrap">
            {user.displayUsername}
          </p>

          <ChevronDown className="transition duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-4"
          >
            <UserAvatar user={user} className="size-8 rounded-sm" />

            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">@{user.displayUsername}</p>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/auth/settings">
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/auth/sign-out">
            <LogOut />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
