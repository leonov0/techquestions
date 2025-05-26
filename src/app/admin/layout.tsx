import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.role.includes("admin")) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={session.user} />
      <SidebarInset className="space-y-4 p-4">
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
