"use client";

import React, { useState, useMemo } from "react";
import { initialAnnouncements } from "@/data/mock-data";
import { Announcement } from "@/types";
import { Modal } from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Eye,
  FileText,
} from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Notifications
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form State for Add / Edit
  const emptyForm: Omit<Announcement, "id"> = {
    title: "",
    content: "",
    category: "Academic",
    date: new Date().toISOString().split("T")[0],
    author: "Vice-Rectorate of Academic Affairs",
  };

  const [formData, setFormData] = useState<Omit<Announcement, "id">>(emptyForm);
  const [activeItem, setActiveItem] = useState<Announcement | null>(null);
  const [formError, setFormError] = useState("");

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);
  };

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [announcements, searchQuery, selectedCategory]);

  // Actions
  const handleOpenAdd = () => {
    setFormData({
      ...emptyForm,
      date: new Date().toISOString().split("T")[0],
    });
    setFormError("");
    setIsAddOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setFormError("Title, content, and issuing department/authority are required.");
      return;
    }

    const newId = `ann-${(announcements.length + 1).toString().padStart(2, "0")}`;
    const newAnnouncement: Announcement = {
      id: newId,
      ...formData,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setIsAddOpen(false);
    showNotification("New official notice published to the bulletin board.");
  };

  const handleOpenEdit = (item: Announcement) => {
    setActiveItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      date: item.date,
      author: item.author,
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setFormError("Title, content, and issuing department/authority are required.");
      return;
    }

    setAnnouncements(
      announcements.map((item) =>
        item.id === activeItem.id ? { ...item, ...formData } : item
      )
    );
    setIsEditOpen(false);
    setActiveItem(null);
    showNotification("Announcement circular updated successfully.");
  };

  const handleOpenDelete = (item: Announcement) => {
    setActiveItem(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!activeItem) return;
    setAnnouncements(announcements.filter((item) => item.id !== activeItem.id));
    setIsDeleteOpen(false);
    setActiveItem(null);
    showNotification("Announcement notice deleted from records.");
  };

  const handleOpenPreview = (item: Announcement) => {
    setActiveItem(item);
    setIsPreviewOpen(true);
  };

  const handleResetData = () => {
    setAnnouncements(initialAnnouncements);
    setSearchQuery("");
    setSelectedCategory("All");
    showNotification("System reset to default mock circulars.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Heading */}
      <div className="bg-white border border-slate-300 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
            Université M&apos;Hamed Bougara de Boumerdès • Service des Affaires Générales
          </div>
          <h1 className="text-2xl font-bold text-[#163964] font-serif">
            Announcement Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Publish, edit, and organize circulars and administrative notices for public display.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetData}
            title="Reset to default mock notices"
            className="px-3 py-2 text-xs border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset Default Notices</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 text-xs font-medium bg-[#163964] hover:bg-[#0f2847] text-white flex items-center gap-1.5 border border-[#0f2847]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Announcement</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {successMessage && (
        <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-xs text-emerald-700 hover:underline font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Classic Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white border border-slate-300 p-3 shadow-2xs">
          <div className="text-xs text-slate-500">Total Circulars</div>
          <div className="text-xl font-bold text-slate-900 font-serif mt-0.5">{announcements.length}</div>
        </div>
        <div className="bg-white border border-slate-300 p-3 shadow-2xs">
          <div className="text-xs text-slate-500">Academic Notices</div>
          <div className="text-xl font-bold text-[#163964] font-serif mt-0.5">
            {announcements.filter((a) => a.category === "Academic").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 p-3 shadow-2xs">
          <div className="text-xs text-slate-500">Important Notices</div>
          <div className="text-xl font-bold text-amber-700 font-serif mt-0.5">
            {announcements.filter((a) => a.category === "Important").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 p-3 shadow-2xs">
          <div className="text-xs text-slate-500">Events & Admin</div>
          <div className="text-xl font-bold text-slate-700 font-serif mt-0.5">
            {announcements.filter((a) => a.category === "Event" || a.category === "Administrative").length}
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white border border-slate-300 p-3 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search announcements by title or issuing department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-600 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#163964]"
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Event">Event</option>
            <option value="Administrative">Administrative</option>
            <option value="Important">Important</option>
          </select>
        </div>
      </div>

      {/* Classic Table */}
      <div className="bg-white border border-slate-300 shadow-2xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#163964] text-white border-b border-[#0f2847]">
              <th className="py-2.5 px-3 font-semibold font-serif w-24">Date</th>
              <th className="py-2.5 px-3 font-semibold font-serif w-28">Category</th>
              <th className="py-2.5 px-3 font-semibold font-serif">Circular Title & Excerpt</th>
              <th className="py-2.5 px-3 font-semibold font-serif w-48 hidden md:table-cell">Authority / Department</th>
              <th className="py-2.5 px-3 font-semibold font-serif text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredAnnouncements.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  No announcements match your search or category filter.
                </td>
              </tr>
            ) : (
              filteredAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-mono border border-slate-300 bg-slate-50 text-slate-700">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 font-serif leading-tight">
                      {item.title}
                    </div>
                    <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                      {item.content}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-600 hidden md:table-cell">
                    {item.author}
                  </td>

                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* Preview Button */}
                      <button
                        onClick={() => handleOpenPreview(item)}
                        title="Preview"
                        className="p-1 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Edit"
                        className="p-1 border border-slate-300 bg-white hover:bg-slate-100 text-[#163964]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleOpenDelete(item)}
                        title="Delete"
                        className="p-1 border border-red-200 bg-white hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredAnnouncements.length} of {announcements.length} records</span>
          <span>State: Client Local Memory</span>
        </div>
      </div>

      {/* ADD ANNOUNCEMENT MODAL */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Announcement Circular"
        description="Fill in the formal circular details to publish to the university notice board."
      >
        <form onSubmit={handleSaveAdd} className="space-y-3 text-xs">
          {formError && (
            <div className="p-2.5 bg-red-50 border border-red-300 text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Announcement Title *</label>
            <input
              type="text"
              placeholder="e.g. Schedule of Make-up Exams & Defense Sessions"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Announcement["category"],
                  })
                }
                className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              >
                <option value="Academic">Academic</option>
                <option value="Event">Event</option>
                <option value="Administrative">Administrative</option>
                <option value="Important">Important</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Publication Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Issuing Authority / Faculty *</label>
            <input
              type="text"
              placeholder="e.g. Deanery of Faculty of Sciences"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Circular Content / Official Text *</label>
            <textarea
              rows={4}
              placeholder="Enter official circular message..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#163964] hover:bg-[#0f2847] text-white font-medium border border-[#0f2847]"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT ANNOUNCEMENT MODAL */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Announcement Circular"
        description="Modify circular data and save updates directly to local state."
      >
        <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
          {formError && (
            <div className="p-2.5 bg-red-50 border border-red-300 text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Announcement Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Announcement["category"],
                  })
                }
                className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              >
                <option value="Academic">Academic</option>
                <option value="Event">Event</option>
                <option value="Administrative">Administrative</option>
                <option value="Important">Important</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800">Publication Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Issuing Authority / Faculty *</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-800">Circular Content / Official Text *</label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#163964] hover:bg-[#0f2847] text-white font-medium border border-[#0f2847]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm Deletion"
        description="Are you certain you wish to remove this circular?"
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-red-50 border border-red-300 text-red-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 font-serif">
                &quot;{activeItem?.title}&quot;
              </p>
              <p className="text-red-700 mt-1">
                This notice will be removed from the active announcement bulletin.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-medium"
            >
              Delete Notice
            </button>
          </div>
        </div>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Official Circular Preview"
        description="Public bulletin preview"
      >
        {activeItem && (
          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-2.5 flex justify-between items-center font-mono">
              <span>Date: <strong>{activeItem.date}</strong></span>
              <span>Category: <strong>{activeItem.category}</strong></span>
            </div>

            <h3 className="text-base font-bold text-slate-900 font-serif">
              {activeItem.title}
            </h3>

            <div className="bg-white border-l-2 border-[#163964] pl-3 py-1 text-slate-700 text-xs leading-relaxed whitespace-pre-line">
              {activeItem.content}
            </div>

            <div className="pt-2 border-t border-slate-200 text-slate-500 flex justify-between items-center text-[11px]">
              <span>Issued by: <strong className="text-slate-800">{activeItem.author}</strong></span>
              <span className="font-mono">Ref: {activeItem.id}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-3 py-1.5 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
