"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Users, Zap, Sparkles, Settings, Activity, LogOut, Menu, X } from "lucide-react";
import { AuthGuard, useUser } from "@/components/auth-guard";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
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
        <div className="flex min-h-screen text-slate-100">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-panel rounded-lg text-slate-200"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 glass-panel border-r-0 border-r-white/5 py-8 px-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="mb-12 pl-4">
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        ClinicOS
                    </h1>
                    <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1">Intelligence Layer</p>
                </div>

                <nav className="flex-1 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                  ${isActive
                                        ? 'text-white bg-white/10 shadow-lg shadow-blue-500/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'group-hover:text-blue-300 transition-colors'}`} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-white/5">
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-500/20">
                                {user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-[10px] text-slate-400 truncate">{user.role}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 py-8 px-4 lg:px-10 overflow-auto pt-20 lg:pt-8 bg-transparent">
                {children}
            </main>
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    const isLandingPage = pathname === "/";

    // Landing pages get their own clean layout (no auth, no sidebar)
    if (isLandingPage) {
        return (
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        );
    }

    return (
        <body className={`${inter.variable} font-sans antialiased text-slate-100`}>
            {isLoginPage ? (
                children
            ) : (
                <AuthGuard>
                    <DashboardLayout>{children}</DashboardLayout>
                </AuthGuard>
            )}
        </body>
    );
}
