import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="grid min-h-dvh w-full grid-rows-[auto_1fr] gap-4 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
