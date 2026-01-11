import Link from "next/link";
import { Metadata } from "next";
import countiesData from "../../../../data/counties.json";
import SearchBar from "@/components/SearchBar";

interface PageProps {
    params: Promise<{
        state: string;
    }>;
}

// Generate static paths for all states
export async function generateStaticParams() {
    const stateSlugs = [...new Set(countiesData.counties.map((c) => c.stateSlug))];
    return stateSlugs.map((state) => ({ state }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { state: stateSlug } = await params;
    const stateCounties = countiesData.counties.filter((c) => c.stateSlug === stateSlug);

    if (stateCounties.length === 0) {
        return { title: "State Not Found" };
    }

    const stateName = stateCounties[0].state;
    const avgSpeed = Math.round(
        stateCounties.reduce((sum, c) => sum + c.estimatedSpeed, 0) / stateCounties.length
    );

    return {
        title: `Rural Internet in ${stateName} | ${stateCounties.length} Counties`,
        description: `Find the best rural counties for remote work in ${stateName}. Average speed: ${avgSpeed} Mbps. Compare ${stateCounties.length} locations.`,
    };
}

export default async function StatePage({ params }: PageProps) {
    const { state: stateSlug } = await params;
    const stateCounties = countiesData.counties.filter((c) => c.stateSlug === stateSlug);

    if (stateCounties.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center glass p-12 rounded-2xl">
                    <h1 className="text-4xl font-bold mb-4">State Not Found</h1>
                    <p className="text-slate-400 mb-6">The state you're looking for doesn't exist.</p>
                    <Link href="/usa/" className="btn-primary">Browse All States</Link>
                </div>
            </div>
        );
    }

    const stateName = stateCounties[0].state;
    const avgSpeed = Math.round(
        stateCounties.reduce((sum, c) => sum + c.estimatedSpeed, 0) / stateCounties.length
    );
    const avgScore = Math.round(
        stateCounties.reduce((sum, c) => sum + c.remoteWorkScore, 0) / stateCounties.length
    );
    const maxSpeed = Math.max(...stateCounties.map(c => c.estimatedSpeed));
    const minCost = Math.min(...stateCounties.map(c => c.costOfLivingIndex));

    // Sort by remote work score
    const sortedCounties = [...stateCounties].sort((a, b) => b.remoteWorkScore - a.remoteWorkScore);

    // Prepare search data
    const searchData = stateCounties.map(c => ({
        state: c.state,
        stateSlug: c.stateSlug,
        county: c.county,
        countySlug: c.countySlug,
        estimatedSpeed: c.estimatedSpeed,
        remoteWorkScore: c.remoteWorkScore,
    }));

    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home</Link>
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href="/usa/" className="text-slate-400 hover:text-cyan-400 transition-colors">States</Link>
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">{stateName}</span>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Remote Work in <span className="gradient-text">{stateName}</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-8">
                        Explore {stateCounties.length} rural counties with an average internet speed of {avgSpeed} Mbps.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="stat-card">
                            <div className="stat-value">{stateCounties.length}</div>
                            <div className="stat-label">Counties</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{avgSpeed}</div>
                            <div className="stat-label">Avg Mbps</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{maxSpeed}</div>
                            <div className="stat-label">Max Mbps</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{avgScore}</div>
                            <div className="stat-label">Avg Score</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl">
                        <SearchBar counties={searchData} placeholder={`Search counties in ${stateName}...`} />
                    </div>
                </div>

                {/* Counties Grid */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        Counties in {stateName}
                    </h2>
                    <span className="text-slate-400">Sorted by score</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCounties.map((county, index) => (
                        <Link
                            key={county.countySlug}
                            href={`/usa/${county.stateSlug}/${county.countySlug}/`}
                            className="glass-card-hover p-6 group relative"
                        >
                            {/* Rank Badge */}
                            {index < 3 && (
                                <div className="absolute -top-3 -left-3 rank-badge shadow-lg">
                                    #{index + 1}
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-5">
                                <div className={index < 3 ? 'pt-2' : ''}>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {county.county}
                                    </h3>
                                    <p className="text-slate-400 text-sm">{county.speedRating} Internet</p>
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

                {/* Back Link */}
                <div className="mt-12 text-center">
                    <Link href="/usa/" className="btn-secondary">
                        ← View All States
                    </Link>
                </div>
            </div>
        </div>
    );
}
