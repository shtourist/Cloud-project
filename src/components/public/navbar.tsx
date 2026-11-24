"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, BookOpen, Building, Newspaper, Home } from "lucide-react";

export function PublicNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", sublabel: "الرئيسية", icon: Home },
    { href: "/departments", label: "Faculties & Departments", sublabel: "الكليات والمعاهد", icon: Building },
    { href: "/news", label: "News & Announcements", sublabel: "الإعلانات الرسمية", icon: Newspaper },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-white border-b border-slate-300">
      {/* Top Ministerial Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-1 px-4 text-[11px] text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-1">
          <span className="font-serif tracking-wide">
            Democratic and Popular Republic of Algeria — Ministry of Higher Education and Scientific Research
          </span>
          <span className="font-serif text-slate-700 hidden md:inline">
            الجمهورية الجزائرية الديمقراطية الشعبية — وزارة التعليم العالي والبحث العلمي
          </span>
        </div>
      </div>

      {/* Main Classical University Header with Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4 group">
            {/* University Logo from user */}
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 bg-white border border-slate-200 p-1 rounded-sm shadow-2xs">
              <Image
                src="/logo.png"
                alt="University of Boumerdes Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="border-l border-slate-300 pl-4">
              <div className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-tight">
                جامعة أمحمد بوقرة - بومرداس
              </div>
              <div className="text-base sm:text-lg font-bold text-[#163964] font-serif tracking-tight">
                Université M&apos;Hamed Bougara de Boumerdès
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide uppercase font-sans">
                University of Boumerdes (UMBB)
              </div>
            </div>
          </Link>

          {/* Right Header: Admin Link & Portal Info */}
          <div className="hidden lg:flex flex-col items-end text-xs text-slate-500 space-y-1.5">
            <div className="text-right">
              <span className="text-slate-400">Campus:</span> <strong className="text-slate-700">Boumerdès 35000, Algeria</strong>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xs font-medium transition-colors"
            >
              <Shield className="h-3.5 w-3.5 text-[#163964]" />
              <span>Admin Portal Login</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border border-slate-300 rounded-xs text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Classic Deep Navy Horizontal Navigation Bar */}
      <nav className="bg-[#163964] text-white border-t border-[#0f2847] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                      active
                        ? "bg-[#0f2847] text-white border-amber-400 font-semibold"
                        : "border-transparent text-slate-200 hover:bg-[#1d4677] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 opacity-80" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center">
              <Link
                href="/admin/login"
                className="text-xs px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#0f2847] rounded-xs transition-colors flex items-center gap-1.5 font-medium"
              >
                <Shield className="h-3.5 w-3.5 text-amber-300" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f2847] border-t border-[#1d4677] px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-xs text-sm font-medium ${
                    active
                      ? "bg-[#163964] text-white border-l-4 border-amber-400 font-semibold"
                      : "text-slate-200 hover:bg-[#163964] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </div>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#1d4677]">
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-amber-300 font-medium"
              >
                Admin Portal Login →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
