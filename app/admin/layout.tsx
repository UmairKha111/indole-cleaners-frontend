import { ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";
import AdminProtect from "./AdminProtect";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminProtect>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </AdminProtect>
  );
}
