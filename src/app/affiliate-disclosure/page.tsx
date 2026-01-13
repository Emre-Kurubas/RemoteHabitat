import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Affiliate Disclosure | Remote Habitat",
    description: "Transparency about our affiliate partnerships and how we earn revenue.",
};

export default function AffiliateDisclosurePage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-slate-400">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-300">Affiliate Disclosure</li>
                    </ol>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    Affiliate <span className="gradient-text">Disclosure</span>
                </h1>

                <div className="glass p-8 md:p-12 prose prose-invert prose-lg max-w-none">
                    <p className="text-slate-400 text-sm mb-8">Last updated: January 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Earn Revenue</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Remote Habitat is a free resource supported by advertising revenue and affiliate partnerships. This disclosure is provided in accordance with FTC guidelines to ensure transparency about our business relationships.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">What Are Affiliate Links?</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Affiliate links are special tracking links that allow us to earn a commission when you click through and make a purchase or sign up for a service. These links cost you nothing extra—you pay the same price whether you use our link or go directly to the merchant.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Affiliate Partners</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We currently have affiliate partnerships with:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li><strong className="text-white">NordVPN</strong> - Virtual private network service</li>
                        <li><strong className="text-white">NordPass</strong> - Password management service</li>
                    </ul>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We may add additional affiliate partnerships in the future. This page will be updated to reflect any new relationships.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Commitment to Honesty</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We want to be completely transparent:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>We only recommend products and services we genuinely believe can help remote workers</li>
                        <li>Our affiliate relationships do not influence our county data or rankings</li>
                        <li>We never alter our content to favor affiliate products</li>
                        <li>We clearly label sponsored content when applicable</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Advertising</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        In addition to affiliate links, we display advertisements through Google AdSense. These ads are served by Google and may be personalized based on your browsing history. We do not control the specific ads that appear on our site.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why We Use Affiliate Links</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Running a website requires significant time and resources. Affiliate revenue and advertising allow us to:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Keep our content free for all users</li>
                        <li>Maintain and update our county database</li>
                        <li>Publish new guides and resources</li>
                        <li>Improve the user experience</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Choice</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        You are never obligated to click on affiliate links or make purchases. If you prefer not to use our affiliate links, you can always search for products directly. We appreciate your support, but completely understand if you choose not to use our links.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Questions?</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        If you have any questions about our affiliate relationships or advertising, please contact us at affiliates@remotehabitat.org.
                    </p>

                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20">
                        <p className="text-slate-300 text-sm">
                            <strong className="text-white">Summary:</strong> Some links on Remote Habitat are affiliate links. If you click and make a purchase, we may earn a commission at no extra cost to you. This helps keep our site free!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
