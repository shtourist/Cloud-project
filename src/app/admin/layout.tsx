import React from "react";
import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <AdminNav />
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
