"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("clinicos_token"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("clinicos_token");
        localStorage.removeItem("clinicos_user");
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-[#020617]/80 backdrop-blur-md border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-purple-500/25">
                            C
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">ClinicOS</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    Dashboard
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-300 hover:text-red-400 transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 group"
                                >
                                    Launch Console
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 bg-[#020617] absolute left-0 right-0 px-6 shadow-xl">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block py-3 text-slate-300 hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="flex flex-col gap-3 mt-4">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/dashboard" className="bg-white text-black px-5 py-3 rounded-full text-center font-semibold">
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-slate-300 hover:text-red-400 py-2 flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-slate-300 py-2">
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="bg-white text-black px-5 py-3 rounded-full text-center font-semibold"
                                    >
                                        Launch Console
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
