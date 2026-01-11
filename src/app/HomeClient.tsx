'use client';

import SearchBar from '@/components/SearchBar';

interface County {
    state: string;
    stateSlug: string;
    county: string;
    countySlug: string;
    estimatedSpeed: number;
    remoteWorkScore: number;
}

interface HomeClientProps {
    searchData: County[];
}

export default function HomeClient({ searchData }: HomeClientProps) {
    return (
        <SearchBar
            counties={searchData}
            placeholder="Search 3,000+ counties by name or state..."
        />
    );
}
