"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  FileText,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Modal } from "@/components/ui/dialog";
import { API_BASE_URL } from "@/lib/api";

type Announcement = {
  ann_id: string | number;
  ann_name: string;
  ann_desc: string;
};

function isAnnouncement(value: unknown): value is Announcement {
  return (
    typeof value === "object" &&
    value !== null &&
    "ann_id" in value &&
    (typeof value.ann_id === "string" ||
      (typeof value.ann_id === "number" && Number.isFinite(value.ann_id))) &&
    "ann_name" in value &&
    typeof value.ann_name === "string" &&
    "ann_desc" in value &&
    typeof value.ann_desc === "string"
  );
}

function isAnnouncementList(value: unknown): value is Announcement[] {
  return Array.isArray(value) && value.every(isAnnouncement);
}

function getResponseMessage(value: unknown, fallback: string) {
  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }
  return fallback;
}

async function fetchAnnouncements(): Promise<Announcement[]> {
  const response = await fetch(`${API_BASE_URL}/news`);
  if (!response.ok) {
    throw new Error(`Could not load announcements (${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!isAnnouncementList(data)) {
    throw new Error("The server returned invalid announcement data.");
  }
  return data;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Announcement | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isActive = true;

    fetchAnnouncements()
      .then((data) => {
        if (isActive) {
          setAnnouncements(data);
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Could not load announcements.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

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

  const handleSaveAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!formName.trim() || !formDescription.trim()) {
      setFormError("Title and description are required.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ann_name: formName.trim(),
          ann_desc: formDescription.trim(),
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload, "Could not save the announcement."),
        );
      }

      const createdAnnouncement =
        typeof payload === "object" &&
        payload !== null &&
        "announcement" in payload
          ? payload.announcement
          : null;
      if (!isAnnouncement(createdAnnouncement)) {
        throw new Error("The server returned invalid announcement data.");
      }

      setLoadError(null);
      setAnnouncements((current) => [createdAnnouncement, ...current]);
      setFormName("");
      setFormDescription("");
      setIsAddOpen(false);
      setSuccessMessage("Announcement saved to the database.");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Could not save the announcement.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activeItem) {
      return;
    }

    setDeleteError("");
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/news/${encodeURIComponent(String(activeItem.ann_id))}`,
        { method: "DELETE" },
      );
      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new Error(
          getResponseMessage(payload, "Could not delete the announcement."),
        );
      }

      setAnnouncements((current) =>
        current.filter((announcement) => announcement.ann_id !== activeItem.ann_id),
      );
      setIsDeleteOpen(false);
      setActiveItem(null);
      setSuccessMessage("Announcement deleted from the database.");
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Could not delete the announcement.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white border border-slate-300 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
            Université M&apos;Hamed Bougara de Boumerdès • Service des Affaires
            Générales
          </div>
          <h1 className="text-2xl font-bold text-[#163964] font-serif">
            Announcement Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Announcements shown here are loaded from the database.
          </p>
        </div>

        <button
          onClick={() => {
            setFormName("");
            setFormDescription("");
            setFormError("");
            setIsAddOpen(true);
          }}
          className="px-4 py-2 text-xs font-medium bg-[#163964] hover:bg-[#0f2847] text-white flex items-center gap-1.5 border border-[#0f2847]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Announcement</span>
        </button>
      </div>

      {successMessage && (
        <div
          role="status"
          className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs"
        >
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

      <div className="grid grid-cols-1 gap-3 text-center sm:max-w-xs">
        <div className="bg-white border border-slate-300 p-3 shadow-2xs">
          <div className="text-xs text-slate-500">Database Announcements</div>
          <div className="text-xl font-bold text-slate-900 font-serif mt-0.5">
            {isLoading ? "..." : announcements.length}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-300 p-3 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-300 shadow-2xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#163964] text-white border-b border-[#0f2847]">
              <th className="py-2.5 px-3 font-semibold font-serif">
                Announcement
              </th>
              <th className="py-2.5 px-3 font-semibold font-serif text-right w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={2} role="status" className="py-8 text-center text-slate-500">
                  Loading announcements...
                </td>
              </tr>
            ) : loadError ? (
              <tr>
                <td colSpan={2} role="alert" className="py-8 text-center text-red-700">
                  {loadError}. Check that the backend is running, then refresh.
                </td>
              </tr>
            ) : filteredAnnouncements.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-slate-500">
                  No announcements match your search.
                </td>
              </tr>
            ) : (
              filteredAnnouncements.map((announcement, index) => (
                <tr
                  key={String(announcement.ann_id)}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 font-serif leading-tight">
                      {announcement.ann_name}
                    </div>
                    <div className="text-slate-500 text-[11px] line-clamp-2 mt-0.5">
                      {announcement.ann_desc}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setActiveItem(announcement);
                          setIsPreviewOpen(true);
                        }}
                        aria-label={`Preview ${announcement.ann_name}`}
                        title="Preview"
                        className="p-1 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setActiveItem(announcement);
                          setDeleteError("");
                          setIsDeleteOpen(true);
                        }}
                        aria-label={`Delete ${announcement.ann_name}`}
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
          <span>
            Showing {filteredAnnouncements.length} of {announcements.length}{" "}
            database records
          </span>
          <span>{loadError ? "Connection error" : "Database"}</span>
        </div>
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Announcement"
        description="The title and description will be saved to the database and shown on the public pages."
      >
        <form onSubmit={handleSaveAdd} className="space-y-3 text-xs">
          {formError && (
            <div role="alert" className="p-2.5 bg-red-50 border border-red-300 text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="announcement-title" className="font-semibold text-slate-800">
              Announcement Title *
            </label>
            <input
              id="announcement-title"
              type="text"
              value={formName}
              onChange={(event) => setFormName(event.target.value)}
              className="w-full p-2 border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#163964]"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="announcement-description" className="font-semibold text-slate-800">
              Announcement Description *
            </label>
            <textarea
              id="announcement-description"
              rows={5}
              value={formDescription}
              onChange={(event) => setFormDescription(event.target.value)}
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
              disabled={isSaving}
              className="px-4 py-1.5 bg-[#163964] hover:bg-[#0f2847] disabled:opacity-60 text-white font-medium border border-[#0f2847]"
            >
              {isSaving ? "Saving..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteOpen(false);
          }
        }}
        title="Delete Announcement"
        description="This will permanently remove the announcement from the database and public pages."
      >
        {activeItem && (
          <div className="space-y-4 text-xs">
            {deleteError && (
              <p role="alert" className="p-2.5 bg-red-50 border border-red-300 text-red-700">
                {deleteError}
              </p>
            )}
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 font-serif">
                  &quot;{activeItem.ann_name}&quot;
                </p>
                <p className="text-red-700 mt-1">
                  Are you sure you want to delete this announcement?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteOpen(false)}
                className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-medium disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete Announcement"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Announcement Preview"
        description="Public announcement data from the database"
      >
        {activeItem && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="h-4 w-4" />
              <span>Official announcement</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 font-serif">
              {activeItem.ann_name}
            </h2>
            <p className="bg-white border-l-2 border-[#163964] pl-3 py-1 text-slate-700 text-xs leading-relaxed whitespace-pre-line">
              {activeItem.ann_desc}
            </p>
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
