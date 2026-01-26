"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[128px]" />
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="w-3 h-3" />
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span>v2.0 Now Available with AI Agents</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient">Intelligence Layer</span> <br />
                    for Modern Clinics.
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Turn your Mindbody data into revenue. ClinicOS uses AI to segment clients,
                    automate re-engagment, and fill your calendar while you sleep.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link
                        href="/dashboard"
                        className="group w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Start Automating
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                        See How It Works
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500 animate-in fade-in duration-1000 delay-500">
                    <p className="text-sm font-medium uppercase tracking-wider">Trusted by 500+ clinics</p>
                    <div className="flex gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Placeholder Logos */}
                        <span className="text-xl font-bold font-serif">VOGUE</span>
                        <span className="text-xl font-bold">Forbes</span>
                        <span className="text-xl font-bold tracking-tighter">TechCrunch</span>
                        <span className="text-xl font-bold italic">WIRED</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
