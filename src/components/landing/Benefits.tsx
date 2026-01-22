"use client";

import { Check } from "lucide-react";

const benefits = [
    "Email automation",
    "Tracking & reporting",
    "Personalization",
    "Split testing",
    "Segmentation",
    "CRM & 1:1 email",
    "SMS campaigns",
    "Generative AI",
    "Drag-and-drop designer",
    "Forms & landing pages",
    "Conditional content",
    "AI-powered automation",
];

export function Benefits() {
    return (
        <section id="benefits" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                            Capabilities
                        </span>
                        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Power your healthcare business today
                        </h2>
                        <p className="mt-6 text-xl text-gray-600">
                            Use intelligent marketing automation to improve experiences for every patient.
                        </p>

                        {/* CTA */}
                        <a
                            href="#cta"
                            className="inline-flex items-center gap-2 mt-8 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Get Started Free
                        </a>
                    </div>

                    {/* Right - Benefits Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit}
                                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700 font-medium text-sm">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
