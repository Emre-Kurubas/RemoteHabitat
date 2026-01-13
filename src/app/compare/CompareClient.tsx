"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface County {
    fips: string;
    state: string;
    stateSlug: string;
    county: string;
    countySlug: string;
    maxAvailableSpeed: number;
    estimatedSpeed: number;
    topProvider: string;
    ruralStatus: boolean;
    costOfLivingIndex: number;
    speedRating: string;
    remoteWorkScore: number;
    coverage: {
        speed10_1: number;
        speed25_3: number;
        speed100_20: number;
        speed250_25: number;
        speed1000_100: number;
    };
}

interface CompareClientProps {
    counties: County[];
}

export default function CompareClient({ counties }: CompareClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial counties from URL
    const initialCounties = useMemo(() => {
        const param = searchParams.get("counties");
        if (!param) return [];
        const slugs = param.split(",");
        return slugs
            .map(slug => {
                const [stateSlug, countySlug] = slug.split("-");
                return counties.find(c => c.stateSlug === stateSlug && c.countySlug === countySlug);
            })
            .filter(Boolean) as County[];
    }, [searchParams, counties]);

    const [selectedCounties, setSelectedCounties] = useState<County[]>(initialCounties);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Filter counties based on search
    const filteredCounties = useMemo(() => {
        if (!searchTerm) return [];
        const term = searchTerm.toLowerCase();
        return counties
            .filter(c =>
                c.county.toLowerCase().includes(term) ||
                c.state.toLowerCase().includes(term) ||
                `${c.county}, ${c.state}`.toLowerCase().includes(term)
            )
            .filter(c => !selectedCounties.some(s => s.fips === c.fips))
            .slice(0, 10);
    }, [searchTerm, counties, selectedCounties]);

    // Update URL when selection changes
    const updateUrl = (newSelection: County[]) => {
        if (newSelection.length === 0) {
            router.push("/compare/", { scroll: false });
        } else {
            const slugs = newSelection.map(c => `${c.stateSlug}-${c.countySlug}`).join(",");
            router.push(`/compare/?counties=${slugs}`, { scroll: false });
        }
    };

    const addCounty = (county: County) => {
        if (selectedCounties.length >= 3) return;
        if (selectedCounties.some(c => c.fips === county.fips)) return;
        const newSelection = [...selectedCounties, county];
        setSelectedCounties(newSelection);
        setSearchTerm("");
        setIsSearchOpen(false);
        updateUrl(newSelection);
    };

    const removeCounty = (fips: string) => {
        const newSelection = selectedCounties.filter(c => c.fips !== fips);
        setSelectedCounties(newSelection);
        updateUrl(newSelection);
    };

    const clearAll = () => {
        setSelectedCounties([]);
        router.push("/compare/", { scroll: false });
    };

    // Helper to get color based on value
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-cyan-400";
        if (score >= 40) return "text-yellow-400";
        return "text-red-400";
    };

    const getComparisonLabel = (values: number[], index: number, higherIsBetter: boolean = true) => {
        const value = values[index];
        const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
        const worst = higherIsBetter ? Math.min(...values) : Math.max(...values);

        if (values.length < 2) return null;
        if (value === best) return <span className="text-green-400 text-xs ml-2">Best</span>;
        if (value === worst && values.length > 2) return <span className="text-red-400 text-xs ml-2">Lowest</span>;
        return null;
    };

    return (
        <div>
            {/* County Selection */}
            <div className="glass p-6 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Select Counties to Compare</h2>
                        <p className="text-sm text-slate-400">Choose up to 3 counties</p>
                    </div>
                    {selectedCounties.length > 0 && (
                        <button onClick={clearAll} className="btn-ghost text-sm text-slate-400">
                            Clear All
                        </button>
                    )}
                </div>

                {/* Selected Counties Pills */}
                <div className="flex flex-wrap gap-3 mb-4">
                    {selectedCounties.map(county => (
                        <div
                            key={county.fips}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30"
                        >
                            <span className="text-white font-medium">{county.county}</span>
                            <span className="text-cyan-400 text-sm">{county.state}</span>
                            <button
                                onClick={() => removeCounty(county.fips)}
                                className="ml-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    {/* Empty Slots */}
                    {Array.from({ length: 3 - selectedCounties.length }).map((_, i) => (
                        <button
                            key={`empty-${i}`}
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-600 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add County
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                {(isSearchOpen || selectedCounties.length < 3) && (
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchOpen(true)}
                            placeholder="Search for a county..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />

                        {/* Search Results Dropdown */}
                        {searchTerm && filteredCounties.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                                {filteredCounties.map(county => (
                                    <button
                                        key={county.fips}
                                        onClick={() => addCounty(county)}
                                        className="w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="text-white font-medium">{county.county}</span>
                                            <span className="text-slate-400 ml-2">{county.state}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-cyan-400">{county.estimatedSpeed} Mbps</span>
                                            <span className={`${getScoreColor(county.remoteWorkScore)}`}>
                                                Score: {county.remoteWorkScore}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {searchTerm && filteredCounties.length === 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4 text-center text-slate-400">
                                No counties found matching "{searchTerm}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Comparison Table */}
            {selectedCounties.length >= 2 ? (
                <div className="glass overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50">
                                    <th className="p-4 text-left text-sm font-medium text-slate-400 uppercase tracking-wider w-48">
                                        Metric
                                    </th>
                                    {selectedCounties.map(county => (
                                        <th key={county.fips} className="p-4 text-center min-w-[200px]">
                                            <Link
                                                href={`/usa/${county.stateSlug}/${county.countySlug}/`}
                                                className="text-lg font-bold text-white hover:text-cyan-400 transition-colors"
                                            >
                                                {county.county}
                                            </Link>
                                            <p className="text-sm text-slate-400">{county.state}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {/* Remote Work Score */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Remote Work Score
                                        </div>
                                    </td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className={`text-3xl font-bold ${getScoreColor(county.remoteWorkScore)}`}>
                                                {county.remoteWorkScore}
                                                {getComparisonLabel(selectedCounties.map(c => c.remoteWorkScore), i)}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Internet Speed */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Estimated Speed
                                        </div>
                                    </td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-2xl font-bold text-white">
                                                {county.estimatedSpeed} <span className="text-sm text-slate-400">Mbps</span>
                                                {getComparisonLabel(selectedCounties.map(c => c.estimatedSpeed), i)}
                                            </div>
                                            <div className="mt-2 w-32 mx-auto">
                                                <div className="speed-meter">
                                                    <div
                                                        className="speed-meter-fill"
                                                        style={{ width: `${Math.min(100, (county.estimatedSpeed / 500) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Max Speed */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                            </svg>
                                            Max Available Speed
                                        </div>
                                    </td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-xl font-semibold text-white">
                                                {county.maxAvailableSpeed} <span className="text-sm text-slate-400">Mbps</span>
                                                {getComparisonLabel(selectedCounties.map(c => c.maxAvailableSpeed), i)}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Top Provider */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Top Provider
                                        </div>
                                    </td>
                                    {selectedCounties.map(county => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-white font-medium">{county.topProvider}</div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Cost of Living */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Cost of Living Index
                                        </div>
                                    </td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-xl font-semibold text-white">
                                                {county.costOfLivingIndex}
                                                {getComparisonLabel(selectedCounties.map(c => c.costOfLivingIndex), i, false)}
                                            </div>
                                            <div className="text-sm text-slate-400">
                                                {county.costOfLivingIndex < 100 ? `${100 - county.costOfLivingIndex}% below avg` : `${county.costOfLivingIndex - 100}% above avg`}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Speed Rating */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                            Speed Rating
                                        </div>
                                    </td>
                                    {selectedCounties.map(county => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30">
                                                {county.speedRating}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Coverage Stats Header */}
                                <tr className="bg-slate-800/50">
                                    <td colSpan={selectedCounties.length + 1} className="p-4">
                                        <h3 className="text-white font-semibold">Coverage Statistics</h3>
                                    </td>
                                </tr>

                                {/* 100/20 Mbps Coverage */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300">100/20 Mbps Coverage</td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-lg font-semibold text-white">
                                                {county.coverage.speed100_20}%
                                                {getComparisonLabel(selectedCounties.map(c => c.coverage.speed100_20), i)}
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* 1000/100 Mbps Coverage */}
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 text-slate-300">Gigabit Coverage</td>
                                    {selectedCounties.map((county, i) => (
                                        <td key={county.fips} className="p-4 text-center">
                                            <div className="text-lg font-semibold text-white">
                                                {county.coverage.speed1000_100}%
                                                {getComparisonLabel(selectedCounties.map(c => c.coverage.speed1000_100), i)}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* View Details Links */}
                    <div className="p-6 border-t border-slate-700/50 flex flex-wrap justify-center gap-4">
                        {selectedCounties.map(county => (
                            <Link
                                key={county.fips}
                                href={`/usa/${county.stateSlug}/${county.countySlug}/`}
                                className="btn-primary text-sm"
                            >
                                View {county.county} Details
                            </Link>
                        ))}
                    </div>
                </div>
            ) : selectedCounties.length === 1 ? (
                <div className="glass p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">Add Another County</h3>
                    <p className="text-slate-400">Select at least 2 counties to see a comparison</p>
                </div>
            ) : (
                <div className="glass p-12 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Comparing Counties</h3>
                    <p className="text-slate-400 mb-6">
                        Select 2-3 counties to compare their internet speeds, costs, and remote work scores side-by-side.
                    </p>
                    <Link href="/usa/" className="btn-primary inline-flex">
                        Browse Counties
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
