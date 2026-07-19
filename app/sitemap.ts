import type { MetadataRoute } from "next";
import { SITE_URL, getAllContentEntries } from "@/lib/seo/content";

export const revalidate = 3600; // régénéré au plus une fois par heure

const STATIC_PATHS = ["/a-la-une", "/actualites-nationales", "/dailies", "/ppef", "/podcasts", "/galerie", "/sports"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries = await getAllContentEntries();

    const home: MetadataRoute.Sitemap[number] = {
        url: `${SITE_URL}/fr`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
    };

    const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
        url: `${SITE_URL}/fr${p}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
    }));

    const contentEntries: MetadataRoute.Sitemap = entries.map((e) => ({
        url: e.url,
        lastModified: e.lastModified,
        changeFrequency: e.kind === "article" || e.kind === "daily" ? "weekly" : "monthly",
        priority: 0.8,
    }));

    return [home, ...staticEntries, ...contentEntries];
}
