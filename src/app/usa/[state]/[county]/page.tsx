import { Metadata } from "next";
import Link from "next/link";
import countiesData from "../../../../../data/counties.json";
import CountyStats from "@/components/CountyStats";
import AffiliateCard from "@/components/AffiliateCard";
import HowToContent from "@/components/HowToContent";

interface PageProps {
    params: Promise<{
        state: string;
        county: string;
    }>;
}

// Generate static paths for all counties at build time
export async function generateStaticParams() {
    return countiesData.counties.map((county) => ({
        state: county.stateSlug,
        county: county.countySlug,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { state, county: countySlug } = await params;

    const county = countiesData.counties.find(
        (c) => c.stateSlug === state && c.countySlug === countySlug
    );

    if (!county) {
        return {
            title: "County Not Found",
            description: "The requested county could not be found.",
        };
    }

    const stateAbbr = getStateAbbreviation(county.state);

    return {
        title: `Is Internet in ${county.county}, ${stateAbbr} Good for Remote Work?`,
        description: `${county.county}, ${county.state} has estimated ${county.estimatedSpeed} Mbps internet speed (max ${county.maxAvailableSpeed} Mbps). ${county.speedRating} for remote work with ${county.topProvider}. Cost of living index: ${county.costOfLivingIndex}.`,
        keywords: [
            `${county.county} internet speed`,
            `${county.county} ${county.state} remote work`,
            `${county.county} broadband`,
            `rural internet ${county.state}`,
            `${county.topProvider} ${county.county}`,
        ],
        openGraph: {
            title: `Remote Work Internet in ${county.county}, ${stateAbbr}`,
            description: `Estimated speed: ${county.estimatedSpeed} Mbps | Provider: ${county.topProvider} | Remote Work Score: ${county.remoteWorkScore}/100`,
            type: "article",
        },
    };
}

// Helper to get state abbreviation
function getStateAbbreviation(state: string): string {
    const abbreviations: Record<string, string> = {
        'Texas': 'TX',
        'Colorado': 'CO',
        'Montana': 'MT',
        'New Mexico': 'NM',
        'Oregon': 'OR',
        'Vermont': 'VT',
        'Wyoming': 'WY',
        'Maine': 'ME',
        'Idaho': 'ID',
        'Arizona': 'AZ',
    };
    return abbreviations[state] || state;
}

export default async function CountyPage({ params }: PageProps) {
    const { state, county: countySlug } = await params;

    const county = countiesData.counties.find(
        (c) => c.stateSlug === state && c.countySlug === countySlug
    );

    if (!county) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">County Not Found</h1>
                    <p className="text-slate-400 mb-6">The requested county could not be found.</p>
                    <Link href="/" className="btn-primary">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const stateAbbr = getStateAbbreviation(county.state);

    // Get other counties in the same state for related links
    const relatedCounties = countiesData.counties
        .filter((c) => c.state === county.state && c.countySlug !== county.countySlug)
        .slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={`/usa/${county.stateSlug}/`} className="hover:text-primary-400 transition-colors">{county.state}</Link>
                        <span>/</span>
                        <span className="text-white">{county.county}</span>
                    </nav>

                    {/* Header */}
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4">
                            {county.ruralStatus && (
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                                    Rural
                                </span>
                            )}
                            <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium">
                                {county.speedRating} Internet
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Internet in <span className="gradient-text">{county.county}, {stateAbbr}</span>
                        </h1>

                        <p className="text-xl text-slate-300 mb-6">
                            {county.county} offers an estimated {county.estimatedSpeed} Mbps internet speed (up to {county.maxAvailableSpeed} Mbps available),
                            making it {county.estimatedSpeed >= 100 ? 'an excellent' : county.estimatedSpeed >= 50 ? 'a good' : 'a viable'} choice
                            for remote workers seeking {county.ruralStatus ? 'true rural living' : 'semi-rural lifestyle'} in {county.state}.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#recommendations" className="btn-primary">
                                View Recommendations
                            </a>
                            <Link
                                href={`/usa/${county.stateSlug}/`}
                                className="px-6 py-3 rounded-full border border-slate-600 hover:border-primary-500 transition-colors"
                            >
                                Browse {county.state}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title">Internet & Living Overview</h2>
                    <CountyStats
                        maxAvailableSpeed={county.maxAvailableSpeed}
                        estimatedSpeed={county.estimatedSpeed}
                        speedRating={county.speedRating}
                        topProvider={county.topProvider}
                        ruralStatus={county.ruralStatus}
                        costOfLivingIndex={county.costOfLivingIndex}
                        remoteWorkScore={county.remoteWorkScore}
                    />
                </div>
            </section>

            {/* Affiliate Recommendations */}
            <section id="recommendations" className="py-16 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title">Recommendations for Remote Workers</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <AffiliateCard
                            type="isp"
                            title={`Get Fast Internet in ${county.county}`}
                            description={`Compare internet plans from ${county.topProvider} and other providers serving ${county.county}, ${county.state}. Find the best deals for remote workers.`}
                            ctaText="Compare Internet Plans"
                            ctaLink="#"
                            badge="Recommended"
                        />

                        <AffiliateCard
                            type="vpn"
                            title="Secure Your Remote Connection"
                            description="Protect your work data with a reliable VPN. Essential for remote workers accessing company resources from rural locations."
                            ctaText="Get VPN Protection"
                            ctaLink="#"
                            badge="Security"
                        />
                    </div>
                </div>
            </section>

            {/* Speed Analysis */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title">Internet Speed Analysis</h2>

                    <div className="glass-card p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    What Can You Do with {county.estimatedSpeed} Mbps?
                                </h3>
                                <ul className="space-y-3">
                                    <SpeedCapability
                                        activity="Video Calls (Zoom, Teams)"
                                        requirement={25}
                                        current={county.estimatedSpeed}
                                    />
                                    <SpeedCapability
                                        activity="4K Video Streaming"
                                        requirement={25}
                                        current={county.estimatedSpeed}
                                    />
                                    <SpeedCapability
                                        activity="Large File Uploads"
                                        requirement={50}
                                        current={county.estimatedSpeed}
                                    />
                                    <SpeedCapability
                                        activity="Multiple Users Simultaneously"
                                        requirement={100}
                                        current={county.estimatedSpeed}
                                    />
                                    <SpeedCapability
                                        activity="Cloud Development (CI/CD)"
                                        requirement={150}
                                        current={county.estimatedSpeed}
                                    />
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    Speed Comparison
                                </h3>
                                <div className="space-y-4">
                                    <SpeedBar label="This County (Est.)" speed={county.estimatedSpeed} maxSpeed={400} highlight />
                                    <SpeedBar label="US Rural Average" speed={75} maxSpeed={400} />
                                    <SpeedBar label="US Urban Average" speed={180} maxSpeed={400} />
                                    <SpeedBar label="Fiber Internet" speed={300} maxSpeed={400} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Counties */}
            {relatedCounties.length > 0 && (
                <section className="py-16 bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="section-title">Other Counties in {county.state}</h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedCounties.map((related) => (
                                <Link
                                    key={related.countySlug}
                                    href={`/usa/${related.stateSlug}/${related.countySlug}/`}
                                    className="glass-card-hover p-5 group"
                                >
                                    <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                                        {related.county}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {related.estimatedSpeed} Mbps • Score: {related.remoteWorkScore}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* How-To Content (SEO) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <HowToContent
                    county={county.county}
                    state={county.state}
                    estimatedSpeed={county.estimatedSpeed}
                />
            </div>

            {/* Back to Home CTA */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold mb-4">Explore More Locations</h2>
                        <p className="text-slate-300 mb-6">
                            Compare internet speeds across {countiesData.totalCounties} rural counties in {countiesData.states.length} states.
                        </p>
                        <Link href="/" className="btn-primary inline-block">
                            View All Counties
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Speed capability component
function SpeedCapability({ activity, requirement, current }: { activity: string; requirement: number; current: number }) {
    const capable = current >= requirement;
    return (
        <li className="flex items-center gap-3">
            {capable ? (
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )}
            <span className={capable ? 'text-white' : 'text-slate-400'}>
                {activity}
                <span className="text-slate-500 text-sm ml-2">({requirement}+ Mbps)</span>
            </span>
        </li>
    );
}

// Speed bar component
function SpeedBar({ label, speed, maxSpeed, highlight }: { label: string; speed: number; maxSpeed: number; highlight?: boolean }) {
    const percentage = Math.min((speed / maxSpeed) * 100, 100);
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className={highlight ? 'text-primary-400 font-medium' : 'text-slate-400'}>{label}</span>
                <span className={highlight ? 'text-primary-400 font-medium' : 'text-slate-400'}>{speed} Mbps</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${highlight ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-slate-500'
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
