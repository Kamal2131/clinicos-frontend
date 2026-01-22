"use client";

const integrations = [
    { name: "Salesforce", color: "#00A1E0" },
    { name: "Google Calendar", color: "#4285F4" },
    { name: "Zoom", color: "#2D8CFF" },
    { name: "Slack", color: "#4A154B" },
    { name: "Twilio", color: "#F22F46" },
    { name: "Stripe", color: "#635BFF" },
    { name: "Mailchimp", color: "#FFE01B" },
    { name: "Zapier", color: "#FF4A00" },
    { name: "HubSpot", color: "#FF7A59" },
    { name: "QuickBooks", color: "#2CA01C" },
    { name: "Square", color: "#006AFF" },
    { name: "Calendly", color: "#006BFF" },
];

export function Integrations() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                        Integrations
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                        Connect with your favorite tools
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                        With 100+ integrations, including popular CRM, calendar, and payment apps,
                        you can connect your existing healthcare tools with ease.
                    </p>
                </div>

                {/* Integration Logos Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {integrations.map((integration, index) => (
                        <div
                            key={integration.name}
                            className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: integration.color }}
                            >
                                {integration.name[0]}
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                {integration.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* More Integrations Link */}
                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="text-purple-600 font-medium hover:text-purple-700 underline underline-offset-4"
                    >
                        Explore all 100+ integrations →
                    </a>
                </div>
            </div>
        </section>
    );
}
