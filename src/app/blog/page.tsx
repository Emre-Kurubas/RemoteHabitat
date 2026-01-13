import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts, getFeaturedPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
    title: "Blog & Resources | Remote Habitat",
    description: "Expert guides, tips, and resources for remote workers looking to relocate to rural areas with reliable internet.",
};

export default function BlogPage() {
    const allPosts = getAllPosts();
    const featuredPosts = getFeaturedPosts();
    const regularPosts = allPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm text-slate-300">{allPosts.length} Articles</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Remote Work <span className="gradient-text">Resources</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Expert guides, tips, and insights for remote workers seeking reliable internet in rural America.
                    </p>
                </div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </span>
                            Featured Guides
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}/`}
                                    className="glass-card-hover p-8 group block relative"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                            {post.category}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 pr-20">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {post.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <span className="text-cyan-400 text-sm font-medium group-hover:translate-x-2 transition-transform flex items-center gap-2">
                                            Read More
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Articles */}
                {regularPosts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </span>
                            More Articles
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {regularPosts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}/`}
                                    className="glass-card-hover p-6 group block"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Newsletter CTA */}
                <section className="mt-20">
                    <div className="glass-gradient">
                        <div className="glass p-10 md:p-14 text-center rounded-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Stay <span className="gradient-text">Updated</span>
                            </h2>
                            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                                Get the latest guides and insights on remote work and rural living delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none transition-colors"
                                />
                                <button className="btn-primary whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-3">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
