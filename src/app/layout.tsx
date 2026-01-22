import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ClinicOS Dashboard",
  description: "Multi-location aesthetics clinic automation",
};

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/clients", label: "Clients", icon: "👥" },
  { href: "/workflows", label: "Workflows", icon: "⚡" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0e0e12] text-gray-100`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-60 bg-[#111116] border-r border-gray-800 py-6 px-4 flex flex-col">
            <div className="mb-10 pl-3">
              <h1 className="text-xl font-semibold">
                Clinic<span className="text-purple-400">OS</span>
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">Admin Dashboard</p>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <span className="text-base opacity-70 group-hover:opacity-100">{item.icon}</span>
                  <span className="text-sm text-gray-400 group-hover:text-white">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2.5 px-3 py-2">
                <div className="w-7 h-7 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-medium">C</div>
                <div>
                  <p className="text-xs font-medium">ClinicOS</p>
                  <p className="text-[10px] text-gray-500">v1.0.0</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 py-8 px-10 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
