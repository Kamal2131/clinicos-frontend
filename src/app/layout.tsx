"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Zap, Sparkles, Settings, Activity, LogOut, Menu, X } from "lucide-react";
import { AuthGuard, useUser } from "@/components/auth-guard";
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

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1c1c26] rounded-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-60 bg-[#111116] border-r border-gray-800/50 py-6 px-4 flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
                onClick={() => setSidebarOpen(false)}
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

        <div className="pt-4 border-t border-gray-800/50 space-y-3">
          {user && (
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="w-7 h-7 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-medium">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium">{user.name}</p>
                <p className="text-[10px] text-gray-500">{user.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 py-8 px-4 lg:px-10 overflow-auto lg:ml-0 ml-0 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isLandingPage = pathname?.startsWith("/landing");

  // Landing pages get their own clean layout (no auth, no sidebar)
  if (isLandingPage) {
    return (
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0e0e12] text-gray-100`}>
        {isLoginPage ? (
          children
        ) : (
          <AuthGuard>
            <DashboardLayout>{children}</DashboardLayout>
          </AuthGuard>
        )}
      </body>
    </html>
  );
}
