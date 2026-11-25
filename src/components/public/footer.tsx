import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink, Globe } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[#0f2847] text-slate-300 border-t-4 border-[#163964]">
      {/* Upper Footer: University information & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & University Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-14 w-14 shrink-0 bg-white p-1 rounded-xs border border-slate-300">
                <Image
                  src="/logo.png"
                  alt="University of Boumerdes"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif tracking-tight">
                  جامعة أمحمد بوقرة بومرداس
                </h3>
                <p className="text-sm font-medium text-slate-200">
                  Université M&apos;Hamed Bougara de Boumerdès (UMBB)
                </p>
                <p className="text-xs text-slate-400">
                  University of Boumerdes — Algeria
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              Established in 1998 from historic institutes of national excellence (INH, INELEC, INIM), the University of Boumerdes is a public higher education institution dedicated to scientific research, hydrocarbon engineering, and technology education.
            </p>
          </div>

          {/* Quick Institutional Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-serif border-b border-slate-700 pb-1.5">
              University Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">
                  Home / الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white hover:underline transition-colors">
                  Faculties & Departments / الكليات والمعاهد
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white hover:underline transition-colors">
                  Announcements / الإعلانات الرسمية
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white hover:underline transition-colors inline-flex items-center gap-1">
                  Admin Portal / بوابة الإدارة
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-serif border-b border-slate-700 pb-1.5">
              Rectorate & Campus Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Avenue de l&apos;Indépendance, Boumerdès 35000, Algeria</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>+213 (0) 24 79 52 00</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>contact@univ-boumerdes.dz</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-amber-400 shrink-0" />
                <span>www.univ-boumerdes.dz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Classic Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Université M&apos;Hamed Bougara de Boumerdès (UMBB). All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Academic Portal System</span>
            <span>•</span>
            <span>Vice-Rectorate of Information Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
