"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Can ClinicOS automate patient intake forms and post-appointment follow-ups?",
        answer:
            "Yes, ClinicOS can automate the entire patient journey, including sending digital intake forms before appointments and delivering post-appointment follow-ups or feedback requests. These automations streamline administrative tasks, ensure patients receive all necessary information, and help practices maintain consistent, high-quality communication without manual effort.",
    },
    {
        question: "Is ClinicOS HIPAA compliant, and how does it protect sensitive patient data?",
        answer:
            "ClinicOS is designed with strong data protection practices, including SOC 2 compliance, ongoing security testing, and privacy-by-design workflows. ClinicOS can be configured to support HIPAA-compliant marketing for healthcare organizations that require it, and offers secure authentication and internal access controls to help protect sensitive patient data.",
    },
    {
        question: "How easy is it for healthcare teams to get started with ClinicOS?",
        answer:
            "ClinicOS is built to be intuitive and user-friendly, with a drag-and-drop automation builder and guided setup that make it accessible for teams with limited technical expertise. Free onboarding and migration support are available, so healthcare teams can quickly launch campaigns and automations without a steep learning curve.",
    },
    {
        question: "What kind of onboarding and support does ClinicOS provide?",
        answer:
            "Healthcare clients receive personalized onboarding, including 1:1 coaching sessions and free migration services to import contacts, templates, and automations. Ongoing support is available through live chat, help documentation, and a dedicated customer success team to ensure healthcare organizations can confidently use the platform.",
    },
    {
        question: "How does ClinicOS support personalized patient communications?",
        answer:
            "ClinicOS enables healthcare practices to deliver personalized communications by using segmentation, tags, and custom fields to tailor messages based on each patient's history, preferences, and care journey. Automated workflows can send relevant updates, reminders, and educational content via both email and SMS.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-3xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                        FAQ
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                        Frequently asked questions
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-purple-200 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-medium text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
