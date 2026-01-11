interface AffiliateCardProps {
    type: 'isp' | 'vpn';
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    badge?: string;
}

export default function AffiliateCard({
    type,
    title,
    description,
    ctaText,
    ctaLink,
    badge
}: AffiliateCardProps) {
    const isISP = type === 'isp';

    return (
        <div className="affiliate-card relative overflow-hidden">
            {/* Badge */}
            {badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-xs font-semibold uppercase tracking-wide">
                    {badge}
                </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isISP ? 'bg-primary-500/20' : 'bg-accent-500/20'
                }`}>
                {isISP ? (
                    <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            {/* CTA Button */}
            <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium transition-all text-sm ${isISP
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/30'
                    }`}
            >
                {ctaText}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>

            {/* Affiliate disclosure */}
            <p className="text-xs text-slate-500 mt-2">
                *Affiliate link. We may earn a commission at no extra cost to you.
            </p>
        </div>
    );
}
