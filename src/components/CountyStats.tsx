interface CountyStatsProps {
    maxAvailableSpeed: number;
    estimatedSpeed: number;
    speedRating: string;
    topProvider: string;
    ruralStatus: boolean;
    costOfLivingIndex: number;
    remoteWorkScore: number;
}

export default function CountyStats({
    maxAvailableSpeed,
    estimatedSpeed,
    speedRating,
    topProvider,
    ruralStatus,
    costOfLivingIndex,
    remoteWorkScore,
}: CountyStatsProps) {
    // Color coding for speed
    const getSpeedColor = (rating: string) => {
        switch (rating) {
            case 'Excellent': return 'text-green-400';
            case 'Good': return 'text-primary-400';
            case 'Moderate': return 'text-yellow-400';
            case 'Basic': return 'text-orange-400';
            default: return 'text-red-400';
        }
    };

    // Color for cost of living
    const getCostColor = (index: number) => {
        if (index <= 90) return 'text-green-400';
        if (index <= 110) return 'text-primary-400';
        if (index <= 130) return 'text-yellow-400';
        return 'text-orange-400';
    };

    // Score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-500';
        if (score >= 60) return 'from-primary-500 to-cyan-500';
        if (score >= 40) return 'from-yellow-500 to-amber-500';
        return 'from-orange-500 to-red-500';
    };

    return (
        <div className="space-y-6">
            {/* Speed Disclaimer */}
            <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg">
                <p className="text-sm text-slate-400">
                    <span className="font-semibold text-primary-400">📊 Speed Data:</span> Based on FCC broadband coverage data.
                    &quot;Estimated Speed&quot; reflects typical subscriber speeds (~65% of max available).
                    Actual speeds vary by plan, provider, and location.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Estimated Speed (Primary) */}
                <div className="stat-card col-span-2 lg:col-span-1">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-primary-500/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="stat-value">{estimatedSpeed}</div>
                    <div className="stat-label">Estimated Speed (Mbps)</div>
                    <div className="mt-2 text-xs text-slate-500">
                        Max Available: {maxAvailableSpeed} Mbps
                    </div>
                    <div className={`mt-1 text-sm font-medium ${getSpeedColor(speedRating)}`}>
                        {speedRating}
                    </div>
                </div>

                {/* Remote Work Score */}
                <div className="stat-card">
                    <div className={`w-20 h-20 mb-3 rounded-full flex items-center justify-center border-4 ${remoteWorkScore >= 80 ? 'border-green-500 text-green-500' :
                        remoteWorkScore >= 60 ? 'border-primary-500 text-primary-500' :
                            remoteWorkScore >= 40 ? 'border-yellow-500 text-yellow-500' :
                                'border-red-500 text-red-500'
                        }`}>
                        <span className="text-2xl font-bold">{remoteWorkScore}</span>
                    </div>
                    <div className="stat-label">Remote Work Score</div>
                </div>

                {/* Cost of Living */}
                <div className="stat-card">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-accent-500/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className={`stat-value ${getCostColor(costOfLivingIndex)}`}>{costOfLivingIndex}</div>
                    <div className="stat-label">Cost of Living Index</div>
                    <div className="mt-2 text-xs text-slate-500">
                        (100 = US Average)
                    </div>
                </div>

                {/* Top Provider */}
                <div className="stat-card col-span-2 lg:col-span-1">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-slate-700/50 flex items-center justify-center">
                        <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="text-xl font-bold text-white mb-1">{topProvider}</div>
                    <div className="stat-label">Top Provider</div>
                </div>

                {/* Rural Status */}
                <div className="stat-card">
                    <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center ${ruralStatus ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                        <svg className={`w-7 h-7 ${ruralStatus ? 'text-green-400' : 'text-yellow-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <div className={`text-xl font-bold ${ruralStatus ? 'text-green-400' : 'text-yellow-400'}`}>
                        {ruralStatus ? 'Rural' : 'Semi-Rural'}
                    </div>
                    <div className="stat-label">Location Type</div>
                </div>
            </div>
        </div>
    );
}
