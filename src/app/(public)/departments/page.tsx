"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

type Department = {
  dep_name: string;
  dep_desc: string;
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

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (loadError) {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load departments.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadDepartments();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white border border-slate-300 p-6 shadow-2xs space-y-2">
        <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
          Université M&apos;Hamed Bougara de Boumerdès • Facultés & Instituts
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163964] font-serif">
          Faculties and Academic Departments
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Browse the faculties and academic departments of the University of
          Boumerdes.
        </p>
      </div>

      {isLoading ? (
        <p role="status" className="bg-white border border-slate-300 p-6 text-sm text-slate-600">
          Loading departments...
        </p>
      ) : error ? (
        <p role="alert" className="bg-red-50 border border-red-300 p-6 text-sm text-red-800">
          {error} Check that the backend is running and try again.
        </p>
      ) : departments.length === 0 ? (
        <p className="bg-white border border-slate-300 p-6 text-sm text-slate-600">
          No departments have been added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((department) => (
            <article
              key={department.dep_name}
              className="bg-white border border-slate-300 shadow-2xs"
            >
              <div className="p-5 border-b border-slate-200">
                <span className="text-[11px] text-slate-500 font-serif">
                  UMBB Boumerdes
                </span>
                <h2 className="mt-2 text-lg font-bold text-slate-900 font-serif leading-snug">
                  {department.dep_name}
                </h2>
              </div>
              <p className="p-5 text-sm text-slate-700 leading-relaxed">
                {department.dep_desc}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
