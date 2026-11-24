import React from "react";
import { initialDepartments } from "@/data/mock-data";
import { Building, Mail, MapPin, User, ChevronRight } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-300 p-6 shadow-2xs space-y-2">
        <div className="text-xs font-serif text-slate-500 uppercase tracking-wider">
          Université M&apos;Hamed Bougara de Boumerdès • Faculté & Instituts
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#163964] font-serif">
          Faculties and Academic Departments
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          The University of Boumerdes is composed of 6 principal faculties and specialized institutes providing undergraduate, graduate (LMD system), and engineering degrees.
        </p>
      </div>

      {/* Departments Grid (Simple, Classic Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white border border-slate-300 shadow-2xs flex flex-col justify-between"
          >
            {/* Header of the card */}
            <div className="p-5 border-b border-slate-200">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-mono text-xs font-bold text-[#163964] bg-slate-100 border border-slate-300 px-2 py-0.5">
                  {dept.code}
                </span>
                <span className="text-[11px] text-slate-500 font-serif">
                  UMBB Boumerdes
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-serif leading-snug">
                {dept.name}
              </h2>
            </div>

            {/* Content: Description */}
            <div className="p-5 flex-1 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {dept.description}
              </p>

              {/* Classic Academic Metadata */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[#163964] shrink-0" />
                  <span>Authority: <strong>{dept.headOfDepartment}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#163964] shrink-0" />
                  <span>Campus: {dept.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#163964] shrink-0" />
                  <span>Contact: <a href={`mailto:${dept.contactEmail}`} className="text-[#163964] hover:underline">{dept.contactEmail}</a></span>
                </div>
              </div>
            </div>

            {/* Footer of the card */}
            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Program: Licence, Master & Doctorat</span>
              <span className="font-semibold text-[#163964]">Accredited Division</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
