import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/data/blog-posts";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Article Not Found | Remote Habitat",
        };
    }

    return {
        title: `${post.title} | Remote Habitat`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);

    // Simple markdown-to-HTML conversion for the content
    const formatContent = (content: string) => {
        return content
            .split('\n')
            .map(line => {
                // Headers
                if (line.startsWith('## ')) {
                    return `<h2 class="text-2xl font-bold text-white mt-10 mb-4">${line.slice(3)}</h2>`;
                }
                if (line.startsWith('### ')) {
                    return `<h3 class="text-xl font-semibold text-white mt-8 mb-3">${line.slice(4)}</h3>`;
                }
                // Horizontal rule
                if (line.trim() === '---') {
                    return '<hr class="border-slate-700/50 my-8" />';
                }
                // Bold text
                line = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                // Lists with checkmarks
                if (line.startsWith('✅ ') || line.startsWith('❌ ')) {
                    return `<p class="flex items-start gap-2 my-2">${line}</p>`;
                }
                // Bullet points
                if (line.startsWith('- ')) {
                    return `<li class="ml-4 my-1 text-slate-300">${line.slice(2)}</li>`;
                }
                // Numbered lists
                const numMatch = line.match(/^(\d+)\. (.+)/);
                if (numMatch) {
                    return `<li class="ml-4 my-1 text-slate-300"><span class="text-cyan-400 font-semibold">${numMatch[1]}.</span> ${numMatch[2]}</li>`;
                }
                // Red flags
                if (line.startsWith('🚩 ')) {
                    return `<p class="flex items-start gap-2 my-2 text-amber-400">${line}</p>`;
                }
                // Code
                line = line.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 text-sm">$1</code>');
                // Links
                line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-400 hover:underline">$1</a>');
                // Blockquotes
                if (line.startsWith('> ')) {
                    return `<blockquote class="border-l-4 border-cyan-500/50 pl-4 py-2 my-4 text-slate-300 italic bg-slate-800/30 rounded-r">${line.slice(2)}</blockquote>`;
                }
                // Paragraphs
                if (line.trim() !== '') {
                    return `<p class="my-4 text-slate-300 leading-relaxed">${line}</p>`;
                }
                return '';
            })
            .join('');
    };

    return (
        <div className="min-h-screen py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-slate-400">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blog/" className="hover:text-cyan-400 transition-colors">Blog</Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-300 truncate max-w-[200px]">{post.title}</li>
                    </ol>
                </nav>

                {/* Article Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            {post.category}
                        </span>
                        <span className="text-slate-500 text-sm">{post.readTime}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed mb-6">
                        {post.description}
                    </p>

                    <div className="flex items-center gap-4 pb-8 border-b border-slate-700/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">
                            RH
                        </div>
                        <div>
                            <p className="text-white font-medium">{post.author}</p>
                            <p className="text-sm text-slate-500">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div
                        dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                    />
                </article>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-slate-700/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400">Found this helpful? Share it!</p>
                        <div className="flex items-center gap-3">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://remotehabitat.org/blog/${post.slug}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost text-sm"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://remotehabitat.org/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost text-sm"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}/`}
                                    className="glass-card-hover p-5 group block"
                                >
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
                                        {relatedPost.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mt-3 mb-2 line-clamp-2">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">{relatedPost.readTime}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="mt-16">
                    <div className="glass p-8 text-center rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-3">
                            Ready to Find Your Perfect Location?
                        </h3>
                        <p className="text-slate-400 mb-6">
                            Explore our database of rural counties with reliable internet.
                        </p>
                        <Link href="/usa/" className="btn-primary inline-flex">
                            Browse Counties
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
