import Link from "next/link";
import dynamic from 'next/dynamic';
import countiesData from "../../data/counties.json";
import HomeClient from "./HomeClient";

// Dynamically import US Map to avoid SSR issues
const USAMap = dynamic(() => import('@/components/USAMap'), { ssr: false });

export default function Home() {
    const { counties, states, totalCounties } = countiesData;

    // Calculate aggregated stats for each state
    const statesData = states.map((state) => {
        const stateCounties = counties.filter(c => c.state === state);
        return {
            state,
            counties: stateCounties.length,
            avgSpeed: Math.round(stateCounties.reduce((sum, c) => sum + c.estimatedSpeed, 0) / stateCounties.length),
            avgScore: Math.round(stateCounties.reduce((sum, c) => sum + c.remoteWorkScore, 0) / stateCounties.length),
        };
    });

    // Get top counties by remote work score
    const topCounties = [...counties]
        .sort((a, b) => b.remoteWorkScore - a.remoteWorkScore)
        .slice(0, 6);

    // Prepare search data (lighter version for client)
    const searchData = counties.map(c => ({
        state: c.state,
        stateSlug: c.stateSlug,
        county: c.county,
        countySlug: c.countySlug,
        estimatedSpeed: c.estimatedSpeed,
        remoteWorkScore: c.remoteWorkScore,
    }));

    // Calculate avg speed for display
    const avgSpeed = Math.round(counties.reduce((sum, c) => sum + c.estimatedSpeed, 0) / counties.length);

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center py-20 lg:py-32">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[140px] animate-pulse delay-500" />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-grid opacity-30" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-slate-300">Analyzing {totalCounties.toLocaleString()} counties in real-time</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100">
                            Find <span className="gradient-text">Reliable Internet</span>
                            <br />in Rural America
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
                            Discover the best rural counties for remote work. Compare internet speeds,
                            providers, and cost of living across <span className="text-white font-semibold">{totalCounties.toLocaleString()}</span> locations.
                        </p>

                        {/* Search Bar */}
                        <div className="flex justify-center mb-10 animate-fade-in-up delay-300">
                            <div className="w-full max-w-2xl">
                                <HomeClient searchData={searchData} />
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-400">
                            <Link href="#explore" className="btn-primary group">
                                <span>Explore Counties</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link href="/usa/" className="btn-secondary">
                                Browse All States
                            </Link>
                        </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in-up delay-500">
                        <div className="stat-card group hover:scale-105 transition-transform duration-300">
                            <div className="stat-value">{totalCounties.toLocaleString()}</div>
                            <div className="stat-label">Counties</div>
                        </div>
                        <div className="stat-card group hover:scale-105 transition-transform duration-300">
                            <div className="stat-value">{states.length}</div>
                            <div className="stat-label">States</div>
                        </div>
                        <div className="stat-card group hover:scale-105 transition-transform duration-300">
                            <div className="stat-value">{avgSpeed}</div>
                            <div className="stat-label">Avg Mbps</div>
                        </div>
                        <div className="stat-card group hover:scale-105 transition-transform duration-300">
                            <div className="stat-value">100%</div>
                            <div className="stat-label">Free Data</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-slate-400 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Top Counties Section */}
            <section id="explore" className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="section-title">
                            Top <span className="gradient-text">Remote Work</span> Destinations
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Counties ranked by our Remote Work Score, combining internet speed, reliability, and cost of living.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topCounties.map((county, index) => (
                            <Link
                                key={`${county.stateSlug}-${county.countySlug}`}
                                href={`/usa/${county.stateSlug}/${county.countySlug}/`}
                                className="glass-card-hover p-6 group block relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Rank Badge */}
                                <div className="absolute -top-3 -left-3 rank-badge shadow-lg">
                                    #{index + 1}
                                </div>

                                <div className="flex items-start justify-between mb-5 pt-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {county.county}
                                        </h3>
                                        <p className="text-slate-400">{county.state}</p>
                                    </div>
                                    <div className="score-badge-large">
                                        {county.remoteWorkScore}
                                    </div>
                                </div>

                                {/* Speed Meter */}
                                <div className="mb-5">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-400">Internet Speed</span>
                                        <span className="text-cyan-400 font-semibold">{county.estimatedSpeed} Mbps</span>
                                    </div>
                                    <div className="speed-meter">
                                        <div
                                            className="speed-meter-fill"
                                            style={{ width: `${Math.min(100, (county.estimatedSpeed / 500) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500 block">Provider</span>
                                        <p className="text-white font-medium truncate">{county.topProvider}</p>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block">Cost Index</span>
                                        <p className="text-white font-medium">{county.costOfLivingIndex}</p>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center text-cyan-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                    View Details
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore by State (Map) */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <h2 className="section-title">
                            Explore by <span className="gradient-text">State</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Hover over any state to see average internet speeds and remote work scores. Click to view detailed county data.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <USAMap statesData={statesData} />
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/usa/" className="btn-secondary">
                            View All States List
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center">
                        How It <span className="gradient-text">Works</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        {[
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                ),
                                title: "Search",
                                description: "Browse our database of rural counties with verified internet data from public FCC records."
                            },
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                ),
                                title: "Compare",
                                description: "Compare internet speeds, top providers, and cost of living to find your perfect match."
                            },
                            {
                                icon: (
                                    <>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </>
                                ),
                                title: "Relocate",
                                description: "Make an informed decision and find your ideal rural remote work destination."
                            }
                        ].map((step, index) => (
                            <div key={step.title} className="text-center group">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {step.icon}
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold gradient-text mb-2">{index + 1}</div>
                                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-gradient">
                        <div className="glass p-10 md:p-14 text-center rounded-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Find Your <span className="gradient-text">Remote Work Haven</span>?
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                                Start exploring {totalCounties.toLocaleString()} rural counties with reliable internet and affordable living costs.
                            </p>
                            <Link href="#explore" className="btn-primary inline-flex">
                                Start Exploring
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
