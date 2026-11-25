import React from "react";
import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />
      <main className="flex-1 pb-16">{children}</main>
      <PublicFooter />
    </div>
  );
}
