"use client";

import { Quote, TrendingUp } from "lucide-react";

export function Testimonial() {
    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                        Success Stories
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                        Trusted by healthcare providers
                    </h2>
                </div>

                {/* Main Testimonial Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-10 md:p-14 text-white overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative">
                            {/* Quote Icon */}
                            <Quote className="w-12 h-12 text-white/30 mb-6" />

                            {/* Quote Text */}
                            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                                "ClinicOS transformed how we communicate with patients. The automation saves us hours every week, and our no-show rate dropped by 40%. The ROI has been incredible."
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center justify-between flex-wrap gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                                        DS
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Dr. Sarah Mitchell</p>
                                        <p className="text-white/70">Optimale Health Clinic</p>
                                    </div>
                                </div>

                                {/* ROI Badge */}
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full">
                                    <TrendingUp className="w-5 h-5" />
                                    <span className="font-bold text-lg">6:1 ROI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto text-center">
                    {[
                        { value: "500+", label: "Healthcare Providers" },
                        { value: "2M+", label: "Patients Reached" },
                        { value: "40%", label: "Reduced No-Shows" },
                        { value: "99.9%", label: "Uptime" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-gray-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
