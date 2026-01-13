"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface StateData {
    name: string;
    slug: string;
    countyCount: number;
    avgSpeed: number;
    avgScore: number;
    counties: { county: string }[];
}

interface StatesClientProps {
    stateStats: StateData[];
}

type SortOption = "score-desc" | "score-asc" | "speed-desc" | "speed-asc" | "name-asc" | "name-desc" | "counties-desc";

export default function StatesClient({ stateStats }: StatesClientProps) {
    // Filter state
    const [minSpeed, setMinSpeed] = useState(0);
    const [maxCostOfLiving, setMaxCostOfLiving] = useState(120);
    const [minScore, setMinScore] = useState(0);
    const [sortBy, setSortBy] = useState<SortOption>("score-desc");
    const [showFilters, setShowFilters] = useState(false);

    // Get min/max values for ranges
    const speedRange = useMemo(() => {
        const speeds = stateStats.map(s => s.avgSpeed);
        return { min: Math.min(...speeds), max: Math.max(...speeds) };
    }, [stateStats]);

    const scoreRange = useMemo(() => {
        const scores = stateStats.map(s => s.avgScore);
        return { min: Math.min(...scores), max: Math.max(...scores) };
    }, [stateStats]);

    // Filter and sort states
    const filteredStates = useMemo(() => {
        let result = stateStats.filter(state => {
            if (state.avgSpeed < minSpeed) return false;
            if (state.avgScore < minScore) return false;
            return true;
        });

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case "score-desc":
                    return b.avgScore - a.avgScore;
                case "score-asc":
                    return a.avgScore - b.avgScore;
                case "speed-desc":
                    return b.avgSpeed - a.avgSpeed;
                case "speed-asc":
                    return a.avgSpeed - b.avgSpeed;
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "counties-desc":
                    return b.countyCount - a.countyCount;
                default:
                    return 0;
            }
        });

        return result;
    }, [stateStats, minSpeed, minScore, sortBy]);

    const resetFilters = () => {
        setMinSpeed(0);
        setMaxCostOfLiving(120);
        setMinScore(0);
        setSortBy("score-desc");
    };

    const hasActiveFilters = minSpeed > 0 || minScore > 0 || sortBy !== "score-desc";

    return (
        <>
            {/* Filter Controls */}
            <div className="mb-10">
                {/* Filter Toggle Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {showFilters ? "Hide Filters" : "Show Filters"}
                        {hasActiveFilters && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-400">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
                        >
                            <option value="score-desc">Score (High to Low)</option>
                            <option value="score-asc">Score (Low to High)</option>
                            <option value="speed-desc">Speed (High to Low)</option>
                            <option value="speed-asc">Speed (Low to High)</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="counties-desc">Most Counties</option>
                        </select>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="glass p-6 mb-6 animate-fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Min Speed Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">
                                    Minimum Avg Speed: <span className="text-cyan-400">{minSpeed} Mbps</span>
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={speedRange.max}
                                    value={minSpeed}
                                    onChange={(e) => setMinSpeed(Number(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700"
                                    style={{
                                        background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(minSpeed / speedRange.max) * 100}%, #334155 ${(minSpeed / speedRange.max) * 100}%, #334155 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>0 Mbps</span>
                                    <span>{speedRange.max} Mbps</span>
                                </div>
                            </div>

                            {/* Min Score Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">
                                    Minimum Score: <span className="text-cyan-400">{minScore}</span>
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={minScore}
                                    onChange={(e) => setMinScore(Number(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-700"
                                    style={{
                                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${minScore}%, #334155 ${minScore}%, #334155 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>0</span>
                                    <span>100</span>
                                </div>
                            </div>

                            {/* Reset Button */}
                            <div className="flex items-end">
                                <button
                                    onClick={resetFilters}
                                    className="btn-ghost text-sm text-slate-400 hover:text-white"
                                    disabled={!hasActiveFilters}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Count */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>Showing</span>
                    <span className="text-white font-semibold">{filteredStates.length}</span>
                    <span>of</span>
                    <span className="text-white font-semibold">{stateStats.length}</span>
                    <span>states</span>
                    {hasActiveFilters && (
                        <span className="text-cyan-400">(filtered)</span>
                    )}
                </div>
            </div>

            {/* States Grid */}
            {filteredStates.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStates.map((state, index) => (
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
            ) : (
                <div className="glass p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">No states match your filters</h3>
                    <p className="text-slate-400 mb-6">Try adjusting your filter criteria</p>
                    <button onClick={resetFilters} className="btn-primary">
                        Reset Filters
                    </button>
                </div>
            )}
        </>
    );
}
