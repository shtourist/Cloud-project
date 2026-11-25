"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Shield, LogOut, ExternalLink, Newspaper, ArrowLeft } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return (
      <header className="border-b border-slate-300 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12 shrink-0 bg-white border border-slate-300 p-1">
                <Image
                  src="/logo.png"
                  alt="University of Boumerdes"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-900 font-serif">
                  جامعة أمحمد بوقرة بومرداس
                </span>
                <span className="block text-xs font-serif text-[#163964]">
                  Université M&apos;Hamed Bougara de Boumerdès
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="text-xs text-slate-700 hover:text-[#163964] flex items-center gap-1 font-medium border border-slate-300 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Portal</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const handleLogout = () => {
    router.push("/admin/login");
  };

  return (
    <header className="border-b border-slate-300 bg-white shadow-2xs">
      {/* Top Security Banner */}
      <div className="bg-[#163964] text-white px-4 py-1 text-xs text-center flex items-center justify-center gap-2">
        <Shield className="h-3.5 w-3.5 text-amber-300" />
        <span className="font-serif">
          UMBB Boumerdes Administration Console — Service de Communication et des Annonces
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12 shrink-0 bg-white border border-slate-300 p-1">
                <Image
                  src="/logo.png"
                  alt="University of Boumerdes"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-900 font-serif leading-tight">
                  جامعة بومرداس — الإدارة
                </span>
                <span className="block text-xs font-semibold text-[#163964] font-serif uppercase tracking-wider">
                  Announcement Management Console
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block h-6 w-px bg-slate-300" />

            <nav className="hidden sm:flex items-center space-x-1">
              <Link
                href="/admin/announcements"
                className={`px-3 py-1.5 text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  pathname === "/admin/announcements"
                    ? "bg-[#163964] text-white border-[#163964]"
                    : "text-slate-700 border-transparent hover:bg-slate-100"
                }`}
              >
                <Newspaper className="h-3.5 w-3.5" />
                <span>Circulars & Announcements</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-700 hover:text-[#163964] flex items-center gap-1 border border-slate-300 px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded-xs font-medium"
            >
              <span>View Public Portal</span>
              <ExternalLink className="h-3 w-3 text-slate-500" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-red-700 hover:text-red-900 flex items-center gap-1 border border-red-200 px-3 py-1 bg-red-50 hover:bg-red-100 rounded-xs font-medium"
            >
              <LogOut className="h-3 w-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
