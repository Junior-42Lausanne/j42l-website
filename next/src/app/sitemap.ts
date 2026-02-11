import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    if (process.env.STAGING === 'true') {
        return [];
    }
    const url : string = "https://j42l.ch";
    // const url : string = "localhost:3001/";
    return [
        {
            url: `${url}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${url}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${url}/student`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },{
            url: `${url}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },{
            url: `${url}/services/web`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },{
            url: `${url}/services/prototype`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },{
            url: `${url}/services/automation`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}