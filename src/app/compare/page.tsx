import { Metadata } from "next";
import { Suspense } from "react";
import countiesData from "../../../data/counties.json";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
    title: "Compare Counties | Remote Habitat",
    description: "Compare rural counties side-by-side. Evaluate internet speeds, costs, and remote work scores to find your perfect location.",
};

export default function ComparePage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        <span className="text-sm text-slate-300">Side-by-Side Comparison</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Compare <span className="gradient-text">Counties</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Select up to 3 counties to compare their internet speeds, costs, and remote work scores side-by-side.
                    </p>
                </div>

                {/* Comparison Tool */}
                <Suspense fallback={
                    <div className="glass p-12 text-center">
                        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400">Loading comparison tool...</p>
                    </div>
                }>
                    <CompareClient counties={countiesData.counties} />
                </Suspense>

                {/* Tips Section */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">How to Use</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Search Counties</h3>
                            <p className="text-slate-400 text-sm">
                                Type the name of a county or state to find locations you're interested in.
                            </p>
                        </div>
                        <div className="glass p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Select 2-3 Counties</h3>
                            <p className="text-slate-400 text-sm">
                                Add counties to your comparison. You can compare up to 3 at once.
                            </p>
                        </div>
                        <div className="glass p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Compare & Decide</h3>
                            <p className="text-slate-400 text-sm">
                                Review the comparison table to see which county best fits your needs.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
