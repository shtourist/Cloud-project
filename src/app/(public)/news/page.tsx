"use client";

import { useEffect, useMemo, useState } from "react";
import { Newspaper, Search } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type Announcement = {
  ann_name: string;
  ann_desc: string;
};

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

export default function NewsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

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
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load announcements.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadAnnouncements();
    return () => {
      isActive = false;
    };
  }, []);

  const filteredAnnouncements = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return announcements.filter(
      (announcement) =>
        announcement.ann_name.toLowerCase().includes(query) ||
        announcement.ann_desc.toLowerCase().includes(query),
    );
  }, [announcements, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white border border-slate-300 p-6 shadow-2xs space-y-2">
        <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
          Université M&apos;Hamed Bougara de Boumerdès • Service des Affaires
          Académiques
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163964] font-serif">
          Official News &amp; Announcements
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Official bulletins, administrative notices, and institutional
          announcements.
        </p>
      </div>

      <div className="bg-white border border-slate-300 p-4 shadow-2xs">
        <label htmlFor="announcement-search" className="sr-only">
          Search announcements
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="announcement-search"
            type="search"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
          />
        </div>
      </div>

      {isLoading ? (
        <p
          role="status"
          className="bg-white border border-slate-300 p-6 text-sm text-slate-600"
        >
          Loading announcements...
        </p>
      ) : error ? (
        <p
          role="alert"
          className="bg-red-50 border border-red-300 p-6 text-sm text-red-800"
        >
          {error} Check that the backend is running and try again.
        </p>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="bg-white border border-slate-300 p-10 text-center space-y-2">
          <p className="font-serif font-bold text-slate-800">
            No announcements found
          </p>
          <p className="text-xs text-slate-500">
            There are no announcements matching your search.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 px-1">
            Showing {filteredAnnouncements.length} announcement
            {filteredAnnouncements.length === 1 ? "" : "s"}
          </div>
          {filteredAnnouncements.map((announcement, index) => (
            <article
              key={`${announcement.ann_name}-${index}`}
              className="bg-white border border-slate-300 shadow-2xs"
            >
              <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center gap-2 text-xs text-slate-700 font-medium">
                <Newspaper className="h-3.5 w-3.5 text-[#163964]" />
                <span>Official announcement</span>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
                  {announcement.ann_name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line border-l-2 border-slate-200 pl-3">
                  {announcement.ann_desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
