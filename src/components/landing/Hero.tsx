"use client";

import { ArrowRight, Play } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    Healthcare Marketing Automation
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 max-w-5xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    Healthcare automation software helping deliver{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        better patient experiences
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    Keep your healthcare practice running smoothly with intelligent marketing automation.
                    Acquire and retain patients, and keep satisfaction high.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
                    <a
                        href="#cta"
                        className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1"
                    >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#demo"
                        className="group flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                    >
                        <Play className="w-5 h-5 text-purple-600" />
                        Watch Demo
                    </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400 animate-in fade-in duration-1000 delay-700">
                    <span className="text-sm">Trusted by 500+ healthcare providers</span>
                    <div className="hidden sm:block w-px h-4 bg-gray-300" />
                    <span className="text-sm">HIPAA Compliant</span>
                    <div className="hidden sm:block w-px h-4 bg-gray-300" />
                    <span className="text-sm">99.9% Uptime</span>
                </div>
            </div>
        </section>
    );
}
