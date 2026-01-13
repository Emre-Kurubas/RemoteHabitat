export function CardSkeleton() {
    return (
        <div className="glass-card p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="h-6 w-32 bg-slate-700/50 rounded mb-2" />
                    <div className="h-4 w-20 bg-slate-700/50 rounded" />
                </div>
                <div className="h-10 w-10 bg-slate-700/50 rounded-xl" />
            </div>
            <div className="space-y-3">
                <div className="h-4 w-full bg-slate-700/50 rounded" />
                <div className="h-4 w-3/4 bg-slate-700/50 rounded" />
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between">
                <div className="h-4 w-20 bg-slate-700/50 rounded" />
                <div className="h-4 w-16 bg-slate-700/50 rounded" />
            </div>
        </div>
    );
}

export function CountyCardSkeleton() {
    return (
        <div className="glass-card-hover p-5 animate-pulse">
            <div className="flex items-start justify-between mb-3">
                <div className="h-5 w-28 bg-slate-700/50 rounded" />
                <div className="h-8 w-8 bg-slate-700/50 rounded-lg" />
            </div>
            <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-700/50 rounded" />
                <div className="h-3 w-20 bg-slate-700/50 rounded" />
            </div>
            <div className="mt-3 h-2 w-full bg-slate-700/50 rounded-full" />
        </div>
    );
}

export function StateCardSkeleton() {
    return (
        <div className="glass-card-hover p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="h-6 w-24 bg-slate-700/50 rounded mb-2" />
                    <div className="h-4 w-16 bg-slate-700/50 rounded" />
                </div>
                <div className="h-12 w-12 bg-slate-700/50 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-12 bg-slate-700/50 rounded-lg" />
                <div className="h-12 bg-slate-700/50 rounded-lg" />
            </div>
            <div className="flex gap-2">
                <div className="h-6 w-16 bg-slate-700/50 rounded-full" />
                <div className="h-6 w-16 bg-slate-700/50 rounded-full" />
            </div>
        </div>
    );
}

export function MapSkeleton() {
    return (
        <div className="relative w-full aspect-[1.6] animate-pulse">
            <div className="absolute inset-0 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <div className="h-4 w-32 mx-auto bg-slate-700/50 rounded mb-2" />
                    <div className="h-3 w-24 mx-auto bg-slate-700/50 rounded" />
                </div>
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="glass overflow-hidden animate-pulse">
            <div className="p-4 border-b border-slate-700/50">
                <div className="h-5 w-48 bg-slate-700/50 rounded" />
            </div>
            <div className="divide-y divide-slate-700/30">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-slate-700/50 rounded-lg" />
                            <div>
                                <div className="h-4 w-32 bg-slate-700/50 rounded mb-2" />
                                <div className="h-3 w-24 bg-slate-700/50 rounded" />
                            </div>
                        </div>
                        <div className="h-8 w-20 bg-slate-700/50 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BlogCardSkeleton() {
    return (
        <div className="glass-card-hover p-6 animate-pulse">
            <div className="h-4 w-16 bg-slate-700/50 rounded-full mb-4" />
            <div className="h-6 w-3/4 bg-slate-700/50 rounded mb-3" />
            <div className="h-4 w-full bg-slate-700/50 rounded mb-2" />
            <div className="h-4 w-2/3 bg-slate-700/50 rounded mb-4" />
            <div className="flex justify-between">
                <div className="h-3 w-16 bg-slate-700/50 rounded" />
                <div className="h-3 w-12 bg-slate-700/50 rounded" />
            </div>
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass p-4 rounded-xl">
                    <div className="h-8 w-16 bg-slate-700/50 rounded mb-2" />
                    <div className="h-4 w-20 bg-slate-700/50 rounded" />
                </div>
            ))}
        </div>
    );
}
