import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Remote Habitat",
    description: "Terms and conditions for using the Remote Habitat website and services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-slate-400">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-300">Terms of Service</li>
                    </ol>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    Terms of <span className="gradient-text">Service</span>
                </h1>

                <div className="glass p-8 md:p-12 prose prose-invert prose-lg max-w-none">
                    <p className="text-slate-400 text-sm mb-8">Last updated: January 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Agreement to Terms</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        By accessing or using Remote Habitat (remotehabitat.org), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the website.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Description of Service</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Remote Habitat provides informational content about internet availability and quality in rural US counties. Our service includes:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>County-level internet speed data and statistics</li>
                        <li>Remote work suitability scores</li>
                        <li>Cost of living information</li>
                        <li>Comparison tools</li>
                        <li>Educational blog content</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Accuracy Disclaimer</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        The internet speed and availability data presented on Remote Habitat is sourced from publicly available FCC broadband records and other public sources. While we strive for accuracy, we cannot guarantee that all information is current, complete, or accurate.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        <strong className="text-white">Important:</strong> Actual internet speeds and availability may vary significantly from our reported data. Before making any relocation decisions, we strongly recommend:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Contacting internet service providers directly</li>
                        <li>Verifying service at specific addresses</li>
                        <li>Speaking with current residents</li>
                        <li>Conducting on-site speed tests when possible</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Intellectual Property</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        The website and its original content, features, and functionality are owned by Remote Habitat and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">User Conduct</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Use the website for any unlawful purpose</li>
                        <li>Attempt to gain unauthorized access to any portion of the website</li>
                        <li>Interfere with or disrupt the website or servers</li>
                        <li>Scrape or collect data without permission</li>
                        <li>Transmit viruses, malware, or other harmful code</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Affiliate Links and Advertising</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Remote Habitat contains affiliate links and advertisements. When you click on these links and make purchases, we may earn a commission at no additional cost to you. This helps support the website and allows us to continue providing free content.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Our affiliate relationships do not influence our content or recommendations. We only recommend products and services we believe may be valuable to remote workers.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third-Party Links</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Our website may contain links to third-party websites that are not owned or controlled by Remote Habitat. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Limitation of Liability</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Remote Habitat shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or any content therein.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We are not responsible for any decisions you make based on information provided on this website, including relocation decisions, property purchases, or service subscriptions.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Indemnification</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        You agree to indemnify and hold harmless Remote Habitat and its operators from any claims, damages, obligations, losses, or expenses arising from your use of the website or violation of these Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes to Terms</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after any changes constitutes acceptance of the new Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Governing Law</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        If you have any questions about these Terms of Service, please contact us at legal@remotehabitat.org.
                    </p>
                </div>
            </div>
        </div>
    );
}
