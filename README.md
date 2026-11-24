# Université M'Hamed Bougara de Boumerdès (UMBB)
## Système d'Information et de Gestion des Annonces / Information & Announcement Management Portal

A classic, simple, and formal academic frontend for **Université M'Hamed Bougara de Boumerdès (UMBB)** built with **Next.js (App Router)**, **Tailwind CSS**, and **shadcn/ui** components.

---

### 🏛️ Classic Institutional Architecture

- **Official University Emblem**: The official logo of the University of Boumerdes is incorporated into [`public/logo.png`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/public/logo.png), rendered prominently across the classic institutional header, public pages, and administration console.
- **Classic Academic Styling**:
  - Dignified university deep navy blue (`#163964`) and parchment/white surfaces (`#f6f8fa`).
  - Traditional serif headings for academic authority.
  - Clean rectangular borders and structured bulletin board layouts.
  - Clear separation between the public portal and the administration console.

---

### 📑 Pages

1. **Home Page ([`src/app/(public)/page.tsx`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/src/app/(public)/page.tsx))**
   - Displays official university identity (in Arabic, French, and English) and the institutional emblem.
   - Comprehensive university overview and historic background (FHC, IGEE/INELEC, etc.).
   - Classic bulletin board presenting recent official circulars with direct detail links.
   - Quick access to faculties and academic divisions.

2. **Faculties & Departments ([`src/app/(public)/departments/page.tsx`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/src/app/(public)/departments/page.tsx))**
   - Classic cards presenting all official faculties of UMBB:
     - Faculty of Hydrocarbons and Chemistry (FHC)
     - Institute of Electrical and Electronic Engineering (IGEE / ex-INELEC)
     - Faculty of Sciences (FS)
     - Faculty of Engineering Sciences (FSI)
     - Faculty of Economics, Commercial & Management Sciences (FSEGC)
     - Faculty of Law and Political Sciences (FDSP)
   - Detailed descriptions, campus locations, deaneries, and contact emails.

3. **News & Announcements ([`src/app/(public)/news/page.tsx`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/src/app/(public)/news/page.tsx))**
   - Official circulars bulletin archive.
   - Each entry contains its title, category tag, publication date, issuing authority, and full content.
   - Simple keyword search and category filtering (*Academic, Event, Administrative, Important*).

4. **Admin Login Page ([`src/app/admin/login/page.tsx`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/src/app/admin/login/page.tsx))**
   - Simple institutional login box with university seal.
   - Pre-filled with demo credentials (`admin@univ-boumerdes.dz` / `admin123`).
   - Mock client-side authentication transition.

5. **Admin Announcement Management ([`src/app/admin/announcements/page.tsx`](file:///c:/Users/youne/OneDrive/Desktop/projects/New%20folder%20(2)/src/app/admin/announcements/page.tsx))**
   - Classic administrative data table.
   - **Add Announcement**: Modal dialog to publish new official notices.
   - **Edit Announcement**: Modal to modify circular details.
   - **Delete Announcement**: Confirmation modal to delete circulars.
   - **Preview Announcement**: Public bulletin format preview.
   - **Reset Demo Data**: Quick restore to default sample circulars.
   - Pure frontend React state (`useState`).

---

### 🚀 Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.
