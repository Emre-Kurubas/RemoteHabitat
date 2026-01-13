import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | Remote Habitat",
    description: "Learn about Remote Habitat and our mission to help remote workers find reliable internet in rural America.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-slate-400">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-300">About</li>
                    </ol>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    About <span className="gradient-text">Remote Habitat</span>
                </h1>

                <div className="glass p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                        Remote Habitat was created to help remote workers find their perfect rural location. We believe that reliable internet shouldn't be limited to big cities, and that everyone deserves access to accurate information when making relocation decisions.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        The rise of remote work has opened up incredible opportunities for people to live wherever they want. But finding a rural location with reliable high-speed internet can be challenging. That's where we come in.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="glass p-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Data-Driven</h3>
                        <p className="text-slate-400">
                            Our database includes information on over 3,200 rural US counties, sourced from public FCC broadband records and other official sources.
                        </p>
                    </div>

                    <div className="glass p-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Free to Use</h3>
                        <p className="text-slate-400">
                            All our data and tools are completely free. We're supported by advertising and affiliate partnerships, allowing us to keep our resources accessible to everyone.
                        </p>
                    </div>

                    <div className="glass p-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Always Improving</h3>
                        <p className="text-slate-400">
                            We regularly update our data and add new features to better serve remote workers looking for their ideal rural destination.
                        </p>
                    </div>

                    <div className="glass p-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">For Remote Workers</h3>
                        <p className="text-slate-400">
                            Built by remote workers, for remote workers. We understand the unique needs of people who work from anywhere.
                        </p>
                    </div>
                </div>

                <div className="glass p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">How Our Scores Work</h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        Our Remote Work Score is calculated using multiple factors:
                    </p>
                    <ul className="space-y-4 text-slate-300">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-cyan-400 text-sm font-bold">1</span>
                            </span>
                            <span><strong className="text-white">Internet Speed</strong> - Average and maximum available speeds in the county</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-cyan-400 text-sm font-bold">2</span>
                            </span>
                            <span><strong className="text-white">Coverage</strong> - Percentage of households with access to various speed tiers</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-cyan-400 text-sm font-bold">3</span>
                            </span>
                            <span><strong className="text-white">Provider Diversity</strong> - Number of available internet service providers</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-cyan-400 text-sm font-bold">4</span>
                            </span>
                            <span><strong className="text-white">Cost of Living</strong> - Relative affordability compared to national average</span>
                        </li>
                    </ul>
                </div>

                <div className="glass p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Data Sources</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Our data comes from publicly available sources including:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li>FCC Broadband Data Collection</li>
                        <li>U.S. Census Bureau</li>
                        <li>Bureau of Economic Analysis</li>
                        <li>Internet service provider filings</li>
                    </ul>
                    <p className="text-slate-300 leading-relaxed mt-4">
                        We process and analyze this data to create our unique Remote Work Scores and rankings.
                    </p>
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Find Your Perfect Location?</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/usa/" className="btn-primary">
                            Browse Counties
                        </Link>
                        <Link href="/compare/" className="btn-secondary">
                            Compare Locations
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
