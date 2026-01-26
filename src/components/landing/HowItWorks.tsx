"use client";

import { Database, Brain, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Database,
        title: "Connect Data",
        desc: "Sync with Mindbody in one click. We securely pull your client history, visits, and spend data.",
        color: "blue",
    },
    {
        icon: Brain,
        title: "AI Analysis",
        desc: "Our agents analyze every client to tag them: 'VIP', 'At-Risk', or 'Big Spender' automatically.",
        color: "purple",
    },
    {
        icon: TrendingUp,
        title: "Auto-Revenue",
        desc: "Launch personalized campaigns that fill your calendar. ROI is tracked in real-time.",
        color: "green",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How ClinicOS Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Turn your dormant database into active revenue in three simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-green-500/30 border-t border-dashed border-white/10 z-0" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const colors: any = {
                            blue: "from-blue-500 to-cyan-500 shadow-blue-500/25",
                            purple: "from-purple-500 to-pink-500 shadow-purple-500/25",
                            green: "from-emerald-500 to-green-500 shadow-emerald-500/25",
                        };

                        return (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${colors[step.color]} p-0.5 mb-8 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                    <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center backdrop-blur-xl border border-white/10">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white border border-white/10">
                                        {i + 1}
                                    </span>
                                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                </div>

                                <p className="text-slate-400 leading-relaxed px-4">
                                    {step.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
