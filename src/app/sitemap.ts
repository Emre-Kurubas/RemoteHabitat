import { MetadataRoute } from 'next';
import countiesData from '../../data/counties.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://remotehabitat.org';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/usa`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // State pages
    const statePages: MetadataRoute.Sitemap = countiesData.states.map((state) => ({
        url: `${baseUrl}/usa/${state.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // County pages
    const countyPages: MetadataRoute.Sitemap = countiesData.counties.map((county) => ({
        url: `${baseUrl}/usa/${county.stateSlug}/${county.countySlug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...statePages, ...countyPages];
}
