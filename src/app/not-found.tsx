import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

            <div className="text-center relative z-10 px-4">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500/20 to-violet-500/20 leading-none blur-2xl select-none">
                        404
                    </div>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
                    Looks like this page went off the grid. Let&apos;s get you back to exploring rural internet options.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/" className="btn-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link href="/usa/" className="btn-secondary">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Browse Counties
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="glass p-6 rounded-2xl max-w-lg mx-auto">
                    <p className="text-sm text-slate-400 mb-4">Popular destinations:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link href="/usa/texas/" className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors">
                            Texas
                        </Link>
                        <Link href="/usa/colorado/" className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors">
                            Colorado
                        </Link>
                        <Link href="/usa/montana/" className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors">
                            Montana
                        </Link>
                        <Link href="/blog/" className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors">
                            Blog
                        </Link>
                        <Link href="/compare/" className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors">
                            Compare Tool
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
