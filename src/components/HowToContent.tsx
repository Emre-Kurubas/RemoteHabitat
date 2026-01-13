interface HowToContentProps {
    county: string;
    state: string;
    estimatedSpeed: number;
}

export default function HowToContent({ county, state, estimatedSpeed }: HowToContentProps) {
    return (
        <section className="py-16 border-t border-slate-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 gradient-text">
                    Remote Work Guide for {county}, {state}
                </h2>

                {/* How to Work Remotely Section */}
                <article className="prose prose-invert max-w-none">
                    <h3 className="text-xl font-semibold text-white mb-4">
                        How to Work Remotely from {county}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Working remotely from {county}, {state} offers a unique opportunity to enjoy rural living
                        while maintaining your career. With an estimated internet speed of {estimatedSpeed} Mbps,
                        this location {estimatedSpeed >= 50 ? 'provides adequate bandwidth' : 'may present some challenges'} for
                        most remote work activities including video conferencing, cloud-based applications, and file sharing.
                    </p>

                    {/* Internet Recommendations */}
                    <h3 className="text-xl font-semibold text-white mb-4 mt-8">
                        Internet Requirements for Remote Work
                    </h3>
                    <div className="glass-card p-6 mb-6">
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Video Calls:</strong> 5-25 Mbps for HD video conferencing (Zoom, Teams, Google Meet)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Cloud Storage:</strong> 10+ Mbps for smooth syncing with Dropbox, Google Drive, or OneDrive</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Multiple Devices:</strong> 50+ Mbps recommended for households with multiple remote workers</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">Software Development:</strong> 100+ Mbps ideal for CI/CD pipelines and container downloads</span>
                            </li>
                        </ul>
                    </div>

                    {/* Essential Tips */}
                    <h3 className="text-xl font-semibold text-white mb-4 mt-8">
                        5 Tips for Remote Workers in Rural Areas
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">1</span>
                                <h4 className="font-semibold text-white">Test Before You Commit</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Rent short-term accommodations and test the internet at different times of day before making a long-term move.
                            </p>
                        </div>

                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">2</span>
                                <h4 className="font-semibold text-white">Have a Backup Connection</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Consider mobile hotspot data plans or Starlink as a backup in case your primary connection fails.
                            </p>
                        </div>

                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">3</span>
                                <h4 className="font-semibold text-white">Use a VPN</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Protect your work data with a reliable VPN, especially when working from public spaces or coffee shops.
                            </p>
                        </div>

                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">4</span>
                                <h4 className="font-semibold text-white">Optimize Your Setup</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Use a wired ethernet connection when possible and position your router centrally for best WiFi coverage.
                            </p>
                        </div>

                        <div className="glass-card p-5 md:col-span-2">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">5</span>
                                <h4 className="font-semibold text-white">Join Local Coworking Spaces</h4>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Many rural towns now have coworking spaces with reliable business-grade internet. They&apos;re also great for networking with other remote workers.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
