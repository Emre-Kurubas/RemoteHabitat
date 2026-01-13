import { Metadata } from "next";
import Link from "next/link";
import countiesData from "../../../../../data/counties.json";
import CountyStats from "@/components/CountyStats";
import AffiliateCard from "@/components/AffiliateCard";
import HowToContent from "@/components/HowToContent";
import Breadcrumbs, { BreadcrumbSchema } from "@/components/Breadcrumbs";

interface PageProps {
    params: Promise<{
        state: string;
        county: string;
    }>;
}

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
        'District of Columbia': 'DC', 'Puerto Rico': 'PR',
    };
    return abbreviations[state] || state;
}

// Generate FAQ data
function generateFAQs(county: County) {
    const stateAbbr = getStateAbbreviation(county.state);
    return [
        {
            question: `What is the average internet speed in ${county.county}, ${stateAbbr}?`,
            answer: `${county.county}, ${county.state} has an estimated average internet speed of ${county.estimatedSpeed} Mbps, with maximum available speeds reaching up to ${county.maxAvailableSpeed} Mbps. This is rated as "${county.speedRating}" for remote work purposes.`
        },
        {
            question: `Who is the main internet provider in ${county.county}, ${stateAbbr}?`,
            answer: `The top internet service provider in ${county.county} is ${county.topProvider}. They offer speeds up to ${county.maxAvailableSpeed} Mbps in the area. We recommend contacting ${county.topProvider} directly to verify service availability at your specific address.`
        },
        {
            question: `Is ${county.county}, ${stateAbbr} good for remote work?`,
            answer: `${county.county} has a Remote Work Score of ${county.remoteWorkScore}/100, which indicates it is ${county.remoteWorkScore >= 80 ? 'excellent' : county.remoteWorkScore >= 60 ? 'good' : county.remoteWorkScore >= 40 ? 'adequate' : 'challenging'} for remote work. With ${county.estimatedSpeed} Mbps average speeds, you can ${county.estimatedSpeed >= 100 ? 'easily handle video calls, large file transfers, and multiple users simultaneously' : county.estimatedSpeed >= 50 ? 'comfortably handle video calls and most remote work tasks' : 'handle basic remote work tasks, though heavy data usage may be limited'}.`
        },
        {
            question: `What is the cost of living in ${county.county}, ${stateAbbr}?`,
            answer: `${county.county} has a cost of living index of ${county.costOfLivingIndex}, which is ${county.costOfLivingIndex < 100 ? `${100 - county.costOfLivingIndex}% below` : county.costOfLivingIndex > 100 ? `${county.costOfLivingIndex - 100}% above` : 'equal to'} the national average. Combined with ${county.ruralStatus ? 'its rural setting' : 'its location'}, this makes it ${county.costOfLivingIndex <= 95 ? 'an affordable' : county.costOfLivingIndex <= 105 ? 'a moderately priced' : 'a higher cost'} option for remote workers.`
        },
        {
            question: `Can I work from home with video calls in ${county.county}?`,
            answer: `Yes! With estimated speeds of ${county.estimatedSpeed} Mbps, ${county.county} ${county.estimatedSpeed >= 25 ? 'easily supports video conferencing applications like Zoom, Microsoft Teams, and Google Meet. You should experience smooth, uninterrupted video calls' : 'can support basic video calls, though you may experience occasional quality issues during peak usage times'}. We recommend a minimum of 25 Mbps for reliable video conferencing.`
        }
    ];
}

// Find similar counties based on score and speed
function findSimilarCounties(county: County, allCounties: County[], limit: number = 4) {
    // Filter out current county and find similar ones
    const others = allCounties.filter(
        c => !(c.stateSlug === county.stateSlug && c.countySlug === county.countySlug)
    );

    // Calculate similarity score based on remote work score and speed
    const withSimilarity = others.map(c => ({
        county: c,
        similarity:
            Math.abs(c.remoteWorkScore - county.remoteWorkScore) * 2 +
            Math.abs(c.estimatedSpeed - county.estimatedSpeed) / 10 +
            Math.abs(c.costOfLivingIndex - county.costOfLivingIndex) / 5
    }));

    // Sort by similarity (lower is more similar) and prefer different states for diversity
    withSimilarity.sort((a, b) => {
        // Slight preference for different states (for diversity)
        const stateBonus = (a.county.state !== county.state ? -5 : 0) - (b.county.state !== county.state ? -5 : 0);
        return (a.similarity + stateBonus) - (b.similarity + stateBonus);
    });

    return withSimilarity.slice(0, limit).map(s => s.county);
}

export default async function CountyPage({ params }: PageProps) {
    const { state, county: countySlug } = await params;

    const county = countiesData.counties.find(
        (c) => c.stateSlug === state && c.countySlug === countySlug
    ) as County | undefined;

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
    const faqs = generateFAQs(county);

    // Get other counties in the same state for related links
    const relatedCounties = (countiesData.counties as County[])
        .filter((c) => c.state === county.state && c.countySlug !== county.countySlug)
        .sort((a, b) => b.remoteWorkScore - a.remoteWorkScore)
        .slice(0, 4);

    // Get similar counties from other states
    const similarCounties = findSimilarCounties(county, countiesData.counties as County[], 4);

    // Generate FAQ Schema JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen">
            {/* FAQ Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs with Schema */}
                    <BreadcrumbSchema items={[
                        { label: county.state, href: `/usa/${county.stateSlug}/` },
                        { label: county.county }
                    ]} />
                    <Breadcrumbs items={[
                        { label: county.state, href: `/usa/${county.stateSlug}/` },
                        { label: county.county }
                    ]} />

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
                                href={`/compare/?counties=${county.stateSlug}-${county.countySlug}`}
                                className="px-6 py-3 rounded-full border border-slate-600 hover:border-primary-500 transition-colors"
                            >
                                Compare This County
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

            {/* FAQ Section */}
            <section className="py-16 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl">
                        Common questions about internet and remote work in {county.county}, {stateAbbr}.
                    </p>

                    <div className="space-y-4 max-w-4xl">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="glass group"
                            >
                                <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium hover:text-cyan-400 transition-colors list-none">
                                    <span>{faq.question}</span>
                                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Similar Counties (Cross-State) */}
            {similarCounties.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="section-title">Similar Counties to Consider</h2>
                        <p className="text-slate-400 mb-8 max-w-2xl">
                            Other rural counties with similar internet speeds and remote work scores.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarCounties.map((similar) => (
                                <Link
                                    key={`${similar.stateSlug}-${similar.countySlug}`}
                                    href={`/usa/${similar.stateSlug}/${similar.countySlug}/`}
                                    className="glass-card-hover p-6 group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {similar.county}
                                            </h3>
                                            <p className="text-sm text-slate-400">{similar.state}</p>
                                        </div>
                                        <div className="score-badge text-sm">
                                            {similar.remoteWorkScore}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Speed</span>
                                            <span className="text-cyan-400 font-medium">{similar.estimatedSpeed} Mbps</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Cost Index</span>
                                            <span className="text-white">{similar.costOfLivingIndex}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-700/50 text-cyan-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center">
                                        View Details
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Counties (Same State) */}
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

                        <div className="mt-6 text-center">
                            <Link
                                href={`/usa/${county.stateSlug}/`}
                                className="btn-secondary inline-flex"
                            >
                                View All {county.state} Counties
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
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
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/usa/" className="btn-primary inline-block">
                                Browse All Counties
                            </Link>
                            <Link href="/compare/" className="btn-secondary inline-block">
                                Compare Counties
                            </Link>
                        </div>
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
