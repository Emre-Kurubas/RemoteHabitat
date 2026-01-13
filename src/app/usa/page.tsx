import countiesData from "../../../data/counties.json";
import { Metadata } from "next";
import StatesClient from "./StatesClient";

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
            counties: stateCounties.slice(0, 5).map(c => ({ county: c.county })), // Only pass first 5 for "Featured"
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

                {/* Client Component with Filtering */}
                <StatesClient stateStats={stateStats} />
            </div>
        </div>
    );
}
