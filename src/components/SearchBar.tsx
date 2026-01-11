'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface County {
    state: string;
    stateSlug: string;
    county: string;
    countySlug: string;
    estimatedSpeed: number;
    remoteWorkScore: number;
}

interface SearchBarProps {
    counties: County[];
    placeholder?: string;
}

export default function SearchBar({ counties, placeholder = "Search counties..." }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<County[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const searchQuery = query.toLowerCase();
        const filtered = counties
            .filter(c =>
                c.county.toLowerCase().includes(searchQuery) ||
                c.state.toLowerCase().includes(searchQuery) ||
                `${c.county}, ${c.state}`.toLowerCase().includes(searchQuery)
            )
            .sort((a, b) => b.remoteWorkScore - a.remoteWorkScore)
            .slice(0, 8);

        setResults(filtered);
        setIsOpen(filtered.length > 0);
        setSelectedIndex(-1);
    }, [query, counties]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selected = results[selectedIndex];
            window.location.href = `/usa/${selected.stateSlug}/${selected.countySlug}/`;
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const handleSelect = () => {
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl opacity-0 group-focus-within:opacity-30 blur-lg transition-opacity duration-300" />

                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="search-input pr-12"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {query && (
                        <button
                            onClick={() => { setQuery(''); setIsOpen(false); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700/50"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Dropdown Results */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 glass rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-in border border-slate-700/50">
                    <div className="p-2">
                        {results.map((county, index) => (
                            <Link
                                key={`${county.stateSlug}-${county.countySlug}`}
                                href={`/usa/${county.stateSlug}/${county.countySlug}/`}
                                onClick={handleSelect}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150 ${index === selectedIndex
                                        ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30'
                                        : 'hover:bg-slate-700/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm font-medium text-slate-300">
                                        {county.remoteWorkScore}
                                    </div>
                                    <div>
                                        <span className="font-medium text-white">{county.county}</span>
                                        <span className="text-slate-400">, {county.state}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-cyan-400 font-medium">{county.estimatedSpeed} Mbps</span>
                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Keyboard Hint */}
                    <div className="px-4 py-3 border-t border-slate-700/50 flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">↵</kbd>
                            Select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">Esc</kbd>
                            Close
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
