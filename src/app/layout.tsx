
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicOS | Intelligence Layer",
  description: "AI-powered management for aesthetics clinics.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
