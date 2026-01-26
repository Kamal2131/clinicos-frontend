import Link from "next/link";

const footerLinks = {
    Platform: [
        { label: "Features", href: "#features" },
        { label: "Integrations", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Security", href: "#" },
    ],
    Solutions: [
        { label: "Healthcare", href: "#" },
        { label: "Dental", href: "#" },
        { label: "Medical Spas", href: "#" },
        { label: "Clinics", href: "#" },
    ],
    Resources: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Support", href: "#" },
        { label: "Status", href: "#" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-[#020617] text-white py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">C</div>
                            <span>ClinicOS</span>
                        </Link>
                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                            The intelligent automation layer for modern aesthetics clinics.
                        </p>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-white mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} ClinicOS. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                            HIPAA Compliance
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
