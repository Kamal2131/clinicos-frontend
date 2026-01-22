"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Zap, Sparkles, Settings, Activity } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/workflows", label: "Workflows", icon: Zap },
  { href: "/copy-generator", label: "AI Copy", icon: Sparkles },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0e0e12] text-gray-100`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-60 bg-[#111116] border-r border-gray-800/50 py-6 px-4 flex flex-col">
            <div className="mb-10 pl-3">
              <h1 className="text-xl font-semibold tracking-tight">
                Clinic<span className="text-purple-400">OS</span>
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5 tracking-wide">Admin Dashboard</p>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-500/15 to-transparent border-l-2 border-purple-500 text-white'
                        : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'}
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'opacity-70 group-hover:opacity-100'}`} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-gray-800/50">
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
