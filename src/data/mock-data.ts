import { Department, Announcement } from "@/types";

export const initialDepartments: Department[] = [
  {
    id: "fhc",
    name: "Faculty of Hydrocarbons and Chemistry (FHC)",
    code: "FHC",
    description: "Renowned faculty dedicated to petroleum engineering, petrochemicals, drilling technology, geophysics, and chemical refining processes.",
    headOfDepartment: "Dean of Hydrocarbons & Chemistry",
    contactEmail: "fhc@univ-boumerdes.dz",
    location: "Campus Nord, Route de la Gare, Boumerdès"
  },
  {
    id: "igee",
    name: "Institute of Electrical and Electronic Engineering (IGEE)",
    code: "IGEE",
    description: "Pioneering institute (formerly INELEC) providing English-language engineering education in telecommunications, control systems, and power engineering.",
    headOfDepartment: "Director of IGEE",
    contactEmail: "igee@univ-boumerdes.dz",
    location: "Campus Ouest, Boumerdès"
  },
  {
    id: "fs",
    name: "Faculty of Sciences (FS)",
    code: "FS",
    description: "Comprising the departments of Computer Science, Mathematics, Physics, and Biology, focused on fundamental sciences and applied computational research.",
    headOfDepartment: "Dean of Faculty of Sciences",
    contactEmail: "sciences@univ-boumerdes.dz",
    location: "Campus Centre, Boumerdès"
  },
  {
    id: "fsi",
    name: "Faculty of Engineering Sciences (FSI)",
    code: "FSI",
    description: "Specializing in civil engineering, mechanical engineering, materials science, industrial engineering, and process technology.",
    headOfDepartment: "Dean of Engineering Sciences",
    contactEmail: "fsi@univ-boumerdes.dz",
    location: "Campus Ouest, Boumerdès"
  },
  {
    id: "fsegc",
    name: "Faculty of Economic, Commercial & Management Sciences",
    code: "FSEGC",
    description: "Offering comprehensive academic curricula in economics, finance, accounting, business management, and commercial sciences.",
    headOfDepartment: "Dean of Economic Sciences",
    contactEmail: "fsegc@univ-boumerdes.dz",
    location: "Campus Sud, Boumerdès"
  },
  {
    id: "fdsp",
    name: "Faculty of Law and Political Sciences",
    code: "FDSP",
    description: "Providing rigorous training in public law, private law, international relations, judicial studies, and public administration.",
    headOfDepartment: "Dean of Law & Political Sciences",
    contactEmail: "droit@univ-boumerdes.dz",
    location: "Campus Boudouaou, Boumerdès"
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-01",
    title: "Official Schedule for First Semester Final Examinations 2026/2027",
    content: "The Vice-Rectorate of Academic Affairs informs all registered undergraduate and Master's students across all faculties that the official examination timetable has been finalized and posted on faculty notice boards. Students are requested to bring their student ID cards and comply strictly with examination regulations.",
    category: "Academic",
    date: "2026-11-20",
    author: "Vice-Rectorate of Academic Affairs"
  },
  {
    id: "ann-02",
    title: "National Conference on Energy Transition & Hydrocarbon Innovation",
    content: "The Faculty of Hydrocarbons and Chemistry (FHC) will host the National Scientific Days on Energy Transition and Chemical Engineering on December 14–16. Academic researchers, doctoral candidates, and industrial partners are invited to register their attendance with the organizing committee.",
    category: "Event",
    date: "2026-11-15",
    author: "Scientific Council - FHC"
  },
  {
    id: "ann-03",
    title: "Central University Library Opening Hours & Resource Access",
    content: "The Directorate of the Central Library announces that reading rooms and scientific digital databases (SNDL access) will remain accessible from Sunday to Thursday from 08:00 to 18:00. Student membership cards can be renewed at the central reception desk.",
    category: "Administrative",
    date: "2026-11-10",
    author: "Central Library Directorate"
  },
  {
    id: "ann-04",
    title: "Doctoral Thesis Defense Sessions (LMD & Science) - Autumn Session",
    content: "The Postgraduate Studies and Scientific Research office announces the upcoming doctoral defense schedules for faculties of Science, Engineering, and Economics. Schedules and defense jury compositions are available at the respective departmental secretariats.",
    category: "Important",
    date: "2026-11-05",
    author: "Vice-Rectorate of Higher Degrees & Research"
  },
  {
    id: "ann-05",
    title: "Annual University Sports Tournament & Cultural Days Registration",
    content: "The Directorate of Student Activities invites student clubs, athletic teams, and cultural associations to register for the annual inter-faculty tournaments in football, basketball, chess, and literary competitions.",
    category: "Event",
    date: "2026-10-28",
    author: "Directorate of Student Activities"
  }
];
