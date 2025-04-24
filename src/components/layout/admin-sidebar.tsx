import {
  Brain,
  Building2,
  ChartBar,
  ChartColumnStacked,
  ChevronRight,
  ChevronsUpDown,
  CodeXml,
  Database,
  Library,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

import { TechQuestions } from "@/components/icons/techquestions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getPendingQuestionCount } from "@/features/review-questions";
import { auth } from "@/lib/auth";
import { getCapitalizedFirstLetter } from "@/lib/utils";

export async function AdminSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) {
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
                    Pending Questions
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
                    Questions
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <ChartColumnStacked />
                        Question Categories
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/admin/technologies">
                              <CodeXml />
                              Technologies
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>

                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/admin/companies">
                              <Building2 />
                              Companies
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>

                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href="/admin/seniority-levels">
                              <Brain />
                              Seniority Levels
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/users">
                      <Users />
                      Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/statistics">
                      <ChartBar />
                      Statistics
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
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
