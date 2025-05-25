import { UserAvatar } from "@daveyplate/better-auth-ui";
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
import Link from "next/link";

import { TechQuestions } from "@/components/icons/techquestions";
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

export async function AdminSidebar({
  user,
}: {
  user: {
    name: string;
    displayUsername?: string | null;
    image?: string | null;
  };
}) {
  const getPendingQuestionCountResponse = await getPendingQuestionCount();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/admin">
            <TechQuestions className="size-8" />

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
                  <UserAvatar user={user} className="rounded-sm" />

                  <div className="flex-1 overflow-hidden font-medium text-nowrap text-clip">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs">@{user.displayUsername}</p>
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
