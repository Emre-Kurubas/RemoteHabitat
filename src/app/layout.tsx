import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: "Remote Habitat | Internet Reliability for Rural Remote Work",
        template: "%s | Remote Habitat"
    },
    description: "Find the best rural US counties for remote work. Compare internet speeds, providers, and cost of living for digital nomads and remote workers.",
    keywords: ["remote work", "rural internet", "digital nomad", "work from anywhere", "broadband speed", "rural counties"],
    authors: [{ name: "Remote Habitat" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Remote Habitat",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50">
                    <div className="mx-4 mt-4">
                        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between glass rounded-2xl">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight hidden sm:block">Remote Habitat</span>
                            </Link>

                            <div className="flex items-center gap-2 sm:gap-6">
                                <Link href="/" className="btn-ghost hidden sm:flex">
                                    Home
                                </Link>
                                <Link href="/usa/" className="btn-ghost hidden sm:flex">
                                    Browse States
                                </Link>
                                <Link href="/#explore" className="btn-primary text-sm py-2.5">
                                    Find Your Spot
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="pt-28 min-h-screen">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-800/50 mt-20 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-white tracking-tight">Remote Habitat</span>
                                </div>
                                <p className="text-slate-400 max-w-md leading-relaxed">
                                    Helping remote workers find reliable internet in rural America.
                                    Compare speeds, providers, and cost of living across thousands of counties.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-5">Resources</h4>
                                <ul className="space-y-3 text-slate-400">
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Speed Test
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            Remote Work Guide
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Provider Comparison
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-white mb-5">Legal</h4>
                                <ul className="space-y-3 text-slate-400">
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="hover:text-cyan-400 transition-colors">Affiliate Disclosure</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-slate-500 text-sm">
                                © {new Date().getFullYear()} Remote Habitat. Data sourced from public FCC broadband records.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-500 text-sm">Built with</span>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full glass text-xs text-slate-300">Next.js</span>
                                    <span className="px-3 py-1 rounded-full glass text-xs text-slate-300">Tailwind</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
