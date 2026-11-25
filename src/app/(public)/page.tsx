"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Building, Newspaper, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type Department = {
  dep_name: string;
  dep_desc: string;
};

type Announcement = {
  ann_name: string;
  ann_desc: string;
};

function isDepartmentList(value: unknown): value is Department[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item: unknown) =>
        typeof item === "object" &&
        item !== null &&
        "dep_name" in item &&
        typeof item.dep_name === "string" &&
        "dep_desc" in item &&
        typeof item.dep_desc === "string",
    )
  );
}

function isAnnouncementList(value: unknown): value is Announcement[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item: unknown) =>
        typeof item === "object" &&
        item !== null &&
        "ann_name" in item &&
        typeof item.ann_name === "string" &&
        "ann_desc" in item &&
        typeof item.ann_desc === "string",
    )
  );
}

export default function HomePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [departmentsError, setDepartmentsError] = useState<string | null>(null);
  const [announcementsError, setAnnouncementsError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadDepartments() {
      try {
        const response = await fetch(`${API_BASE_URL}/deps`);
        if (!response.ok) {
          throw new Error(`Could not load departments (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!isDepartmentList(data)) {
          throw new Error("The server returned invalid department data.");
        }
        if (isActive) {
          setDepartments(data);
        }
      } catch (error) {
        if (isActive) {
          setDepartmentsError(
            error instanceof Error ? error.message : "Could not load departments.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoadingDepartments(false);
        }
      }
    }

    async function loadAnnouncements() {
      try {
        const response = await fetch(`${API_BASE_URL}/news`);
        if (!response.ok) {
          throw new Error(`Could not load announcements (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!isAnnouncementList(data)) {
          throw new Error("The server returned invalid announcement data.");
        }
        if (isActive) {
          setAnnouncements(data);
        }
      } catch (error) {
        if (isActive) {
          setAnnouncementsError(
            error instanceof Error ? error.message : "Could not load announcements.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoadingAnnouncements(false);
        }
      }
    }

    void loadDepartments();
    void loadAnnouncements();
    return () => {
      isActive = false;
    };
  }, []);

  const recentAnnouncements = announcements.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Classic University Presentation Header / Hero */}
      <section className="bg-white border border-slate-300 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-slate-200 pb-6">
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 bg-white border border-slate-300 p-2 shadow-2xs">
            <Image
              src="/logo.png"
              alt="University of Boumerdes Emblem"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-3 text-center md:text-left">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                جامعة أمحمد بوقرة بومرداس
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#163964] font-serif tracking-tight">
                Université M&apos;Hamed Bougara de Boumerdès (UMBB)
              </h1>
              <p className="text-sm font-medium text-slate-600">
                Official Information & Announcement Management Portal
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
              Welcome to the official information portal of Université M&apos;Hamed Bougara de Boumerdès (UMBB). Founded in 1998, UMBB is a premier Algerian public university renowned for its specialized training in hydrocarbon engineering, electrical and electronic engineering (IGEE/INELEC), natural sciences, technology, law, and economics.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link href="/departments">
                <Button className="bg-[#163964] hover:bg-[#0f2847] text-white text-xs sm:text-sm font-medium rounded-xs px-4 h-9">
                  <Building className="h-4 w-4 mr-1.5" />
                  View Faculties & Departments
                </Button>
              </Link>
              <Link href="/news">
                <Button variant="outline" className="border-slate-300 text-slate-800 hover:bg-slate-100 text-xs sm:text-sm font-medium rounded-xs px-4 h-9">
                  <Newspaper className="h-4 w-4 mr-1.5 text-[#163964]" />
                  Official Circulars & Notices
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Traditional Quick Facts Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="pt-2 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-[#163964] font-serif">1998</div>
            <div className="text-xs text-slate-600">Established by Decree</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-[#163964] font-serif">
              {isLoadingDepartments ? "..." : departments.length}
            </div>
            <div className="text-xs text-slate-600">Faculties & Institutes</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-[#163964] font-serif">30,000+</div>
            <div className="text-xs text-slate-600">Students Enrolled</div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold text-[#163964] font-serif">Boumerdès</div>
            <div className="text-xs text-slate-600">Central & Coastal Campuses</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Announcements and department quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Classic Official Notice Board */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#163964] pb-2">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-[#163964]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Announcements & Circulars
              </h2>
            </div>
            <Link
              href="/news"
              className="text-xs font-semibold text-[#163964] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {isLoadingAnnouncements ? (
              <p role="status" className="bg-white border border-slate-300 p-6 text-sm text-slate-600">
                Loading announcements...
              </p>
            ) : announcementsError ? (
              <p role="alert" className="bg-red-50 border border-red-300 p-6 text-sm text-red-800">
                {announcementsError}
              </p>
            ) : recentAnnouncements.length === 0 ? (
              <p className="bg-white border border-slate-300 p-6 text-sm text-slate-600">
                No announcements have been added yet.
              </p>
            ) : (
              recentAnnouncements.map((announcement, index) => (
                <article
                  key={`${announcement.ann_name}-${index}`}
                  className="bg-white border border-slate-300 p-4 sm:p-5 hover:border-[#163964] transition-colors shadow-2xs"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif mb-2 leading-snug hover:text-[#163964] transition-colors">
                    <Link href="/news">{announcement.ann_name}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {announcement.ann_desc}
                  </p>
                </article>
              ))
            )}
          </div>

          <div className="pt-2 text-center">
            <Link href="/news">
              <Button variant="outline" className="w-full border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-medium h-9">
                Open Announcement Notice Board Archive
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column (1 col): Classic Sidebar with Faculties and Portal Info */}
        <div className="space-y-6">
          {/* Faculties Box */}
          <div className="bg-white border border-slate-300 shadow-2xs">
            <div className="bg-[#163964] text-white px-4 py-2.5 font-serif font-bold text-sm flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Faculties & Institutes</span>
            </div>
            <ul className="divide-y divide-slate-200 text-xs">
              {isLoadingDepartments ? (
                <li role="status" className="p-3 text-slate-500">Loading departments...</li>
              ) : departmentsError ? (
                <li role="alert" className="p-3 text-red-700">{departmentsError}</li>
              ) : departments.length === 0 ? (
                <li className="p-3 text-slate-500">No departments have been added yet.</li>
              ) : (
                departments.map((department) => (
                  <li key={department.dep_name} className="p-3 hover:bg-slate-50 transition-colors">
                    <Link href="/departments" className="block space-y-1">
                      <div className="font-semibold text-slate-900 hover:text-[#163964]">
                        {department.dep_name}
                      </div>
                      <div className="text-slate-500 line-clamp-2">
                        {department.dep_desc}
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <Link
                href="/departments"
                className="text-xs font-semibold text-[#163964] hover:underline"
              >
                Browse All Academic Details →
              </Link>
            </div>
          </div>

          {/* Academic Calendar / Notice Info Box */}
          <div className="bg-white border border-slate-300 p-4 shadow-2xs space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="font-serif font-bold text-slate-900 text-sm">
                Academic Year 2026 / 2027
              </h3>
              <p className="text-xs text-slate-500">Official University Secretariat</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All circulars published on this system are issued under the authority of the Rectorate of Université M&apos;Hamed Bougara de Boumerdès.
            </p>
            <div className="bg-slate-50 p-2.5 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div><strong>Working Days:</strong> Sunday – Thursday</div>
              <div><strong>Hours:</strong> 08:00 – 16:30 CET</div>
              <div><strong>Location:</strong> Boumerdès Central Campus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
