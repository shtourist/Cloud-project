import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Université M'Hamed Bougara de Boumerdès (UMBB) | Information & Announcements",
  description: "Official portal for academic departments and official announcements of Université M'Hamed Bougara de Boumerdès.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f6f8fa] flex flex-col antialiased text-slate-800">
        {children}
      </body>
    </html>
  );
}
