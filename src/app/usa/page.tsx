import Link from "next/link";
import countiesData from "../../../data/counties.json";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Browse All States | Remote Habitat",
    description: "Explore rural counties across all US states for remote work. Compare internet speeds and find your perfect location.",
};

export default function StatesPage() {
    const { counties, states } = countiesData;

    // Group counties by state with stats and rank
    const stateStats = states.map((state) => {
        const stateCounties = counties.filter((c) => c.state === state);
        const avgSpeed = Math.round(
            stateCounties.reduce((sum, c) => sum + c.estimatedSpeed, 0) / stateCounties.length
        );
        const avgScore = Math.round(
            stateCounties.reduce((sum, c) => sum + c.remoteWorkScore, 0) / stateCounties.length
        );
        const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

        return {
            name: state,
            slug: stateSlug,
            countyCount: stateCounties.length,
            avgSpeed,
            avgScore,
            counties: stateCounties,
        };
    }).sort((a, b) => b.avgScore - a.avgScore);

    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <span className="text-sm text-slate-300">{states.length} States Available</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Browse <span className="gradient-text">All States</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Explore {counties.length.toLocaleString()} rural counties across {states.length} states.
                        Find the perfect location for your remote work lifestyle.
                    </p>
                </div>

                {/* States Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stateStats.map((state, index) => (
                        <Link
                            key={state.slug}
                            href={`/usa/${state.slug}/`}
                            className="glass-card-hover p-6 group relative"
                        >
                            {/* Rank Badge */}
                            <div className="absolute -top-3 -left-3 rank-badge shadow-lg">
                                #{index + 1}
                            </div>

                            <div className="flex items-start justify-between mb-5 pt-2">
                                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {state.name}
                                </h2>
                                <div className="score-badge">
                                    {state.avgScore}
                                </div>
                            </div>

                            {/* Speed Meter */}
                            <div className="mb-5">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Avg Speed</span>
                                    <span className="text-cyan-400 font-semibold">{state.avgSpeed} Mbps</span>
                                </div>
                                <div className="speed-meter">
                                    <div
                                        className="speed-meter-fill"
                                        style={{ width: `${Math.min(100, (state.avgSpeed / 500) * 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="glass p-3 rounded-xl text-center">
                                    <p className="text-2xl font-bold gradient-text">{state.countyCount}</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Counties</p>
                                </div>
                                <div className="glass p-3 rounded-xl text-center">
                                    <p className="text-2xl font-bold gradient-text">{state.avgScore}</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider">Avg Score</p>
                                </div>
                            </div>

                            <div className="text-sm text-slate-400">
                                <span className="font-medium text-slate-300">Featured:</span>{" "}
                                {state.counties.slice(0, 3).map((c) => c.county).join(", ")}
                                {state.counties.length > 3 && "..."}
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center text-cyan-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                View Counties
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
