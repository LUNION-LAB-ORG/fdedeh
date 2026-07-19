import { obtenirTousArticlesAction } from "@/features/articles/actions/article.action";
import { obtenirTousDailiesAction } from "@/features/dailies/dailies.action";
import { obtenirListePpefAction } from "@/features/ppef/ppef.action";
import { addDomainToBackendImagePath } from "@/utils/image-utils";

export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://fdedeh.info").replace(/\/+$/, "");

/** URL publique absolue (le site est préfixé par la locale /fr). */
export function absUrl(path: string): string {
    return `${SITE_URL}/fr${path.startsWith("/") ? path : "/" + path}`;
}

export type SeoEntry = {
    path: string; // ex. /articles/mon-slug
    url: string; // absolue
    title: string;
    description: string;
    lastModified: Date;
    publishedAt: Date;
    image?: string;
    section?: string;
    kind: "article" | "daily" | "ppef" | "podcast";
};

export function stripHtml(input?: string | null): string {
    return (input || "").replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

export function excerpt(input?: string | null, n = 160): string {
    const s = stripHtml(input);
    return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

function toDate(v?: string | null): Date {
    const d = v ? new Date(v) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
}

function isoDay(v?: string | null): string {
    return toDate(v).toISOString().split("T")[0];
}

async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
    try {
        return await p;
    } catch {
        return fallback;
    }
}

export async function getArticleEntries(): Promise<SeoEntry[]> {
    const res = await safe(obtenirTousArticlesAction({ limit: 500 }), null as any);
    const list = res?.data?.data ?? [];
    return list
        .filter((a: any) => a?.slug && a?.type !== "PODCAST")
        .map((a: any) => ({
            path: `/articles/${a.slug}`,
            url: absUrl(`/articles/${a.slug}`),
            title: a.title,
            description: excerpt(a.content),
            lastModified: toDate(a.updated_at || a.created_at),
            publishedAt: toDate(a.created_at),
            image: a.path_resource ? addDomainToBackendImagePath(a.path_resource) : undefined,
            section: a.category?.name,
            kind: "article" as const,
        }));
}

export async function getPodcastEntries(): Promise<SeoEntry[]> {
    const res = await safe(obtenirTousArticlesAction({ type: "PODCAST", limit: 300 }), null as any);
    const list = res?.data?.data ?? [];
    return list
        .filter((a: any) => a?.slug)
        .map((a: any) => ({
            path: `/podcasts/${a.slug}`,
            url: absUrl(`/podcasts/${a.slug}`),
            title: a.title,
            description: excerpt(a.content),
            lastModified: toDate(a.updated_at || a.created_at),
            publishedAt: toDate(a.created_at),
            image: a.path_resource ? addDomainToBackendImagePath(a.path_resource) : undefined,
            section: "Podcast",
            kind: "podcast" as const,
        }));
}

export async function getDailyEntries(): Promise<SeoEntry[]> {
    const res = await safe(obtenirTousDailiesAction({}), null as any);
    const list = res?.data?.data ?? [];
    return list
        .filter((d: any) => d?.published_at)
        .map((d: any) => {
            const day = isoDay(d.published_at);
            return {
                path: `/dailies/${day}`,
                url: absUrl(`/dailies/${day}`),
                title: excerpt(d.introduction, 90) || "A Barthelemy Inabo",
                description: excerpt(d.introduction),
                lastModified: toDate(d.updated_at || d.published_at),
                publishedAt: toDate(d.published_at),
                image: d.contents?.[0]?.path_image ? addDomainToBackendImagePath(d.contents[0].path_image) : undefined,
                section: "A Barthelemy Inabo",
                kind: "daily" as const,
            };
        });
}

export async function getPpefEntries(): Promise<SeoEntry[]> {
    const res = await safe(obtenirListePpefAction(), null as any);
    const list = res?.data?.data ?? [];
    return list
        .filter((p: any) => p?.slug)
        .map((p: any) => ({
            path: `/ppef/${p.slug}`,
            url: absUrl(`/ppef/${p.slug}`),
            title: p.title,
            description: excerpt(p.description ?? p.title),
            lastModified: toDate(p.updated_at || p.published_at),
            publishedAt: toDate(p.published_at),
            image: p.path_resource ? addDomainToBackendImagePath(p.path_resource) : undefined,
            section: "PPEF",
            kind: "ppef" as const,
        }));
}

/** Tous les contenus, triés du plus récent au plus ancien. */
export async function getAllContentEntries(): Promise<SeoEntry[]> {
    const [articles, podcasts, dailies, ppef] = await Promise.all([
        getArticleEntries(),
        getPodcastEntries(),
        getDailyEntries(),
        getPpefEntries(),
    ]);
    return [...articles, ...podcasts, ...dailies, ...ppef].sort(
        (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
}
