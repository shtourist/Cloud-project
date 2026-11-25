export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headOfDepartment: string;
  contactEmail: string;
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "Academic" | "Event" | "Administrative" | "Important";
  date: string;
  author: string;
}
