"use client";

import React, { useState, useMemo } from "react";
import { initialAnnouncements } from "@/data/mock-data";
import { Calendar, Search, Newspaper, ArrowUpDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const categories = ["All", "Academic", "Event", "Administrative", "Important"];

  const filteredAnnouncements = useMemo(() => {
    return initialAnnouncements
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-300 p-6 shadow-2xs space-y-2">
        <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
          Université M&apos;Hamed Bougara de Boumerdès • Service des Affaires Académiques
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163964] font-serif">
          Official News & Announcements
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Official bulletins, administrative notices, academic schedules, and institutional circulars published by the governing councils and faculties of University of Boumerdes.
        </p>
      </div>

      {/* Classic Simple Search and Filter Box */}
      <div className="bg-white border border-slate-300 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search circulars by keyword, title, or issuing department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964] rounded-xs"
            />
          </div>

          {/* Sort order */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xs shrink-0"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
            <span>Sort: {sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" />
            Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs border rounded-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-[#163964] text-white border-[#163964]"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-red-600 hover:underline ml-auto"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 px-1 flex justify-between items-center">
          <span>Showing {filteredAnnouncements.length} circular{filteredAnnouncements.length === 1 ? "" : "s"}</span>
          <span className="font-serif">Official Bulletin of Boumerdes</span>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white border border-slate-300 p-10 text-center space-y-2">
            <p className="font-serif font-bold text-slate-800">No notices found</p>
            <p className="text-xs text-slate-500">No official circulars match your query. Try resetting filters.</p>
          </div>
        ) : (
          filteredAnnouncements.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="bg-white border border-slate-300 shadow-2xs"
            >
              <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-[#163964]" />
                  <span>Date: <strong>{item.date}</strong></span>
                  <span className="text-slate-300">|</span>
                  <span>Ref: <strong className="font-mono">{item.id.toUpperCase()}</strong></span>
                </div>
                <span className="px-2 py-0.5 border border-slate-300 bg-white text-slate-700 font-mono text-[11px]">
                  {item.category}
                </span>
              </div>

              <div className="p-4 sm:p-6 space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug">
                  {item.title}
                </h2>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line border-l-2 border-slate-200 pl-3">
                  {item.content}
                </div>
              </div>

              <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-2 text-xs text-slate-500 flex justify-between items-center">
                <span>Issuing Authority: <strong className="text-slate-800">{item.author}</strong></span>
                <span className="text-[11px] text-slate-400 font-serif">Université M&apos;Hamed Bougara</span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
