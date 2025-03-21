import { ChevronsUpDown, Library, Users } from "lucide-react";
import Link from "next/link";

import { TechQuestions } from "@/components/icons/techquestions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/features/auth";
import { getCapitalizedFirstLetter } from "@/lib/utils";

const items = [
  {
    title: "Pending questions",
    url: "/admin/pending-questions",
    icon: Library,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
];

export async function AdminSidebar() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const { image, username, name } = session.user;

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/admin">
            <div className="size-8">
              <TechQuestions />
            </div>

            <div>
              <p className="text-sm font-medium">TechQuestions</p>
              <p className="text-xs">Admin panel</p>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Moderation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="rounded-sm">
                    <AvatarImage src={image ?? undefined} />

                    <AvatarFallback className="rounded-sm">
                      {username && getCapitalizedFirstLetter(username)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 overflow-hidden font-medium text-nowrap text-clip">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs">@{username}</p>
                  </div>

                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <TechQuestions />
                    Home
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
