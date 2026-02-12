import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const isStaging : boolean = process.env.STAGING === 'true';

    if (isStaging) {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        };
    } else {
        return {
            rules: {
                userAgent: '*',
                allow: '/',
                disallow: '/legals',
            },
            sitemap: 'https://j42l.ch/sitemap.xml',
        }
    }
}