import { getArticleEntries, getDailyEntries, getPpefEntries } from "@/lib/seo/content";

export const revalidate = 900; // l'actu bouge vite → 15 min

function esc(s?: string): string {
    return (s || "").replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string));
}

export async function GET() {
    // Google News : uniquement les contenus des dernières 48 h.
    const cutoff = Date.now() - 48 * 3600 * 1000;

    const [articles, dailies, ppef] = await Promise.all([getArticleEntries(), getDailyEntries(), getPpefEntries()]);

    const recent = [...articles, ...dailies, ...ppef]
        .filter((e) => e.publishedAt.getTime() >= cutoff)
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .slice(0, 1000);

    const urls = recent
        .map(
            (e) => `  <url>
    <loc>${esc(e.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>Fernand Dédeh</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${e.publishedAt.toISOString()}</news:publication_date>
      <news:title>${esc(e.title)}</news:title>
    </news:news>
  </url>`
        )
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
