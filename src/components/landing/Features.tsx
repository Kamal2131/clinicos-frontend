"use client";

import {
    Mail,
    MessageSquare,
    Calendar,
    Users,
    BarChart3,
    Settings,
} from "lucide-react";

const features = [
    {
        icon: Mail,
        title: "Omnichannel Updates",
        description:
            "Provide office updates, health blogs, and information directly to patients using email and SMS.",
    },
    {
        icon: Calendar,
        title: "Appointment Automation",
        description:
            "From intake forms to post-appointment feedback, cover the whole patient journey automatically.",
    },
    {
        icon: MessageSquare,
        title: "Appointment Reminders",
        description:
            "Reduce missed appointments with automated confirmations and reminders via email or SMS.",
    },
    {
        icon: Users,
        title: "Patient Segmentation",
        description:
            "Tag, track, and segment contacts based on patient history, preferences, and more.",
    },
    {
        icon: Settings,
        title: "Team Alignment",
        description:
            "Leave notes and assign tasks to make sure critical information gets processed correctly.",
    },
    {
        icon: BarChart3,
        title: "Analytics & Insights",
        description:
            "Track patient engagement, campaign performance, and ROI with detailed analytics.",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                        Features
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                        Everything you need to grow your healthcare practice
                    </h2>
                    <p className="mt-6 text-xl text-gray-600">
                        Intelligent marketing automation fuels your practice's growth with automated 1:1 communications across the entire customer lifecycle.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="group p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
