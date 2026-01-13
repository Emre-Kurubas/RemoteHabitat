import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Remote Habitat",
    description: "Learn how Remote Habitat collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-slate-400">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-300">Privacy Policy</li>
                    </ol>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    Privacy <span className="gradient-text">Policy</span>
                </h1>

                <div className="glass p-8 md:p-12 prose prose-invert prose-lg max-w-none">
                    <p className="text-slate-400 text-sm mb-8">Last updated: January 2026</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Introduction</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Remote Habitat ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website remotehabitat.org.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Information You Provide</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We may collect information that you voluntarily provide when using our website, such as:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Email address (if you subscribe to our newsletter)</li>
                        <li>Any other information you choose to provide</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Automatically Collected Information</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        When you visit our website, we may automatically collect certain information, including:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                        <li>IP address (anonymized)</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Use Your Information</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>Provide and maintain our website</li>
                        <li>Improve user experience</li>
                        <li>Analyze usage patterns</li>
                        <li>Send newsletters (if subscribed)</li>
                        <li>Respond to inquiries</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies and Tracking</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that are stored on your device.
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We use Google Analytics to understand how visitors use our site. Google Analytics uses cookies to collect information about your use of the website. You can opt out of Google Analytics by installing the Google Analytics opt-out browser add-on.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third-Party Services</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Our website may contain links to third-party websites and services, including affiliate links. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party sites you visit.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Advertising</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Security</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Rights</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Depending on your location, you may have certain rights regarding your personal information, including:
                    </p>
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
                        <li>The right to access your personal data</li>
                        <li>The right to correct inaccurate data</li>
                        <li>The right to delete your data</li>
                        <li>The right to opt out of marketing communications</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Children's Privacy</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes to This Policy</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        If you have any questions about this Privacy Policy, please contact us at privacy@remotehabitat.org.
                    </p>
                </div>
            </div>
        </div>
    );
}
