"use client";

const affiliates = [
    {
        name: "NordVPN",
        tagline: "Secure Your Remote Connection",
        description: "Protect your online privacy while working remotely. Military-grade encryption, 5,500+ servers worldwide, and blazing-fast speeds.",
        features: ["No-logs policy", "Kill switch", "Threat protection"],
        link: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=138808&url_id=902",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 12L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 12l9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        gradient: "from-blue-500 to-cyan-500",
        bgColor: "rgba(6, 182, 212, 0.1)",
        borderColor: "rgba(6, 182, 212, 0.3)",
    },
    {
        name: "NordPass",
        tagline: "Never Forget a Password",
        description: "Secure password manager for remote workers. Generate, store, and autofill complex passwords across all your devices.",
        features: ["Zero-knowledge", "Data breach scanner", "Secure sharing"],
        link: "https://go.nordpass.io/aff_c?offer_id=488&aff_id=138808&url_id=9356",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 15v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="15" r="1" fill="currentColor" />
                <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        gradient: "from-violet-500 to-purple-500",
        bgColor: "rgba(139, 92, 246, 0.1)",
        borderColor: "rgba(139, 92, 246, 0.3)",
    },
];

export default function AffiliateSection() {
    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm text-slate-300">Essential Tools for Remote Workers</span>
                    </div>
                    <h2 className="section-title">
                        Secure Your <span className="gradient-text">Remote Work</span> Setup
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Working remotely from rural areas? Protect your connection and data with these trusted security tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {affiliates.map((affiliate, index) => (
                        <a
                            key={affiliate.name}
                            href={affiliate.link}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="affiliate-card group block"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="p-3 rounded-xl text-white transition-transform group-hover:scale-110 duration-300"
                                    style={{
                                        background: affiliate.bgColor,
                                        border: `1px solid ${affiliate.borderColor}`,
                                    }}
                                >
                                    {affiliate.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {affiliate.name}
                                    </h3>
                                    <p className="text-sm text-slate-400">{affiliate.tagline}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                {affiliate.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {affiliate.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            background: affiliate.bgColor,
                                            border: `1px solid ${affiliate.borderColor}`,
                                            color: affiliate.name === "NordVPN" ? "#06b6d4" : "#8b5cf6",
                                        }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform"
                                style={{ color: affiliate.name === "NordVPN" ? "#06b6d4" : "#8b5cf6" }}
                            >
                                Get {affiliate.name}
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-500 mt-8">
                    Affiliate disclosure: We may earn a commission when you sign up through our links, at no extra cost to you.
                </p>
            </div>
        </section>
    );
}
