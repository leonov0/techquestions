import { ChevronsUpDown, Database, Library, Users } from "lucide-react";
import Link from "next/link";

import { TechQuestions } from "@/components/icons/techquestions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { getPendingQuestionCount } from "@/features/review-questions";
import { getCapitalizedFirstLetter } from "@/lib/utils";

export async function AdminSidebar() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const { image, username, name } = session.user;

  const getPendingQuestionCountResponse = await getPendingQuestionCount();

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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/pending-questions">
                    <Library />
                    <span>Pending questions</span>
                    {getPendingQuestionCountResponse.success &&
                      getPendingQuestionCountResponse.data > 0 && (
                        <Badge>{getPendingQuestionCountResponse.data}</Badge>
                      )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/questions">
                    <Database />
                    <span>Questions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/users">
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
