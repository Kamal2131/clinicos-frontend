"use client";

import {
    Mail,
    MessageSquare,
    Calendar,
    Users,
    BarChart3,
    Brain,
    Sparkles,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI Client Segmentation",
        description: "Automatically tags clients as 'VIP', 'At Risk', or 'High Potential' based on their visit history and spending habits.",
        color: "purple"
    },
    {
        icon: Zap,
        title: "Automated Re-engagement",
        description: "Detects when a client is at risk of churning and instantly triggers a personalized email sequence to win them back.",
        color: "amber"
    },
    {
        icon: Calendar,
        title: "Smart Scheduling",
        description: "Fill last-minute gaps in your calendar by sending targeted offers to clients who are mostly likely to book immediately.",
        color: "blue"
    },
    {
        icon: MessageSquare,
        title: "24/7 AI Receptionist",
        description: "Handle booking inquiries, FAQs, and rescheduling requests via SMS and Webchat without lifting a finger.",
        color: "emerald"
    },
    {
        icon: BarChart3,
        title: "ROI Analytics",
        description: "Track exactly how much revenue each campaign generates. See open rates, booking rates, and total sales.",
        color: "pink"
    },
    {
        icon: Users,
        title: "Unified Profile",
        description: "See everything about a client in one place: visits, spend, communication history, and AI-predicted lifetime value.",
        color: "cyan"
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-purple-900/5 to-[#020617] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Why Clinics Love Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Complete Automation for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">High-Growth Practices</span>
                    </h2>
                    <p className="text-xl text-slate-400">
                        Stop manually texting tailored offers. Let our AI agents handle the busywork while you focus on care.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const colors: any = {
                            purple: "text-purple-400 from-purple-500/20 to-indigo-500/20",
                            amber: "text-amber-400 from-amber-500/20 to-orange-500/20",
                            blue: "text-blue-400 from-blue-500/20 to-cyan-500/20",
                            emerald: "text-emerald-400 from-emerald-500/20 to-green-500/20",
                            pink: "text-pink-400 from-pink-500/20 to-rose-500/20",
                            cyan: "text-cyan-400 from-cyan-500/20 to-sky-500/20",
                        };

                        return (
                            <div
                                key={feature.title}
                                className="group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-300"
                            >
                                <div className="bg-[#0f172a]/80 backdrop-blur-xl p-8 rounded-xl h-full border border-white/5 hover:border-white/10 transition-all">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[feature.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
