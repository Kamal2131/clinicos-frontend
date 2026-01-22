"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export function CTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus("success");
        setEmail("");
    };

    return (
        <section id="cta" className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to transform your healthcare practice?
                </h2>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                    Start your free 14-day trial today. No credit card required.
                </p>

                {/* Email Signup Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={status === "success"}
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="group flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 disabled:opacity-80"
                        >
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Starting...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    Check Your Email
                                </>
                            ) : (
                                <>
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Trust Text */}
                <p className="mt-8 text-white/60 text-sm">
                    Join 500+ healthcare providers already using ClinicOS
                </p>
            </div>
        </section>
    );
}
