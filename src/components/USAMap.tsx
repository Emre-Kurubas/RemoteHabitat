'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import USAMapLib from 'react-usa-map';

interface StateData {
    state: string;
    counties: number;
    avgSpeed: number;
    avgScore: number;
}

interface USAMapProps {
    statesData: StateData[];
}

// Full state name to abbreviation mapping
const stateNameToAbbr: Record<string, string> = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC'
};

// Abbreviation to full state name (reverse mapping)
const abbrToStateName: Record<string, string> = Object.fromEntries(
    Object.entries(stateNameToAbbr).map(([name, abbr]) => [abbr, name])
);

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

// Get color based on score - returns hex color
const getScoreColor = (avgScore: number): string => {
    if (avgScore >= 80) return '#10b981'; // emerald-500
    if (avgScore >= 60) return '#06b6d4'; // cyan-500
    if (avgScore >= 40) return '#3b82f6'; // blue-500
    return '#8b5cf6'; // violet-500
};

export default function USAMap({ statesData }: USAMapProps) {
    const [hoveredState, setHoveredState] = useState<StateData | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const router = useRouter();

    // Build state customization object for react-usa-map
    const statesCustomization = useCallback(() => {
        const customization: Record<string, { fill: string }> = {};

        statesData.forEach((state) => {
            const abbr = stateNameToAbbr[state.state];
            if (abbr) {
                customization[abbr] = {
                    fill: getScoreColor(state.avgScore)
                };
            }
        });

        return customization;
    }, [statesData]);

    // Handle state click - navigate to state page
    const handleStateClick = useCallback((event: { target: { dataset: { name: string } } }) => {
        const stateAbbr = event.target.dataset.name;
        const stateName = abbrToStateName[stateAbbr];
        if (stateName) {
            router.push(`/usa/${slugify(stateName)}/`);
        }
    }, [router]);

    // Handle mouse events for tooltip
    const handleMouseEnter = useCallback((event: React.MouseEvent<SVGPathElement>) => {
        const stateAbbr = (event.target as SVGPathElement).dataset.name;
        if (stateAbbr) {
            const stateName = abbrToStateName[stateAbbr];
            const stateData = statesData.find(s => s.state === stateName);
            if (stateData) {
                setHoveredState(stateData);
            }
        }
    }, [statesData]);

    const handleMouseMove = useCallback((event: React.MouseEvent) => {
        setMousePos({ x: event.clientX, y: event.clientY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredState(null);
    }, []);

    return (
        <div className="w-full max-w-5xl relative">
            {/* Tooltip */}
            {hoveredState && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: mousePos.x + 15,
                        top: mousePos.y + 15,
                        transform: mousePos.x > window.innerWidth - 250 ? 'translateX(-100%)' : 'none'
                    }}
                >
                    <div className="glass p-4 rounded-xl shadow-2xl border border-slate-700/50 min-w-[200px]">
                        <h3 className="text-lg font-bold text-white mb-2">{hoveredState.state}</h3>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Counties:</span>
                                <span className="text-white font-medium">{hoveredState.counties}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Avg Speed:</span>
                                <span className="text-cyan-400 font-medium">{hoveredState.avgSpeed} Mbps</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Work Score:</span>
                                <span className="text-emerald-400 font-medium">{hoveredState.avgScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Geographic USA Map */}
            <div
                className="us-map-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <USAMapLib
                    customize={statesCustomization()}
                    onClick={handleStateClick}
                    onUSAStateMouseEnter={handleMouseEnter}
                    onUSAStateMouseLeave={handleMouseLeave}
                    width="100%"
                    height="auto"
                    defaultFill="rgba(30, 41, 59, 0.5)"
                    title="USA Map - Internet Reliability by State"
                />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }} />
                    <span className="text-slate-400">Excellent (80+)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#06b6d4' }} />
                    <span className="text-slate-400">Good (60-79)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }} />
                    <span className="text-slate-400">Fair (40-59)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }} />
                    <span className="text-slate-400">Limited (&lt;40)</span>
                </div>
            </div>
        </div>
    );
}
