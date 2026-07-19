import { SITE_URL, getAllContentEntries } from "@/lib/seo/content";

export const revalidate = 3600;

function esc(s?: string): string {
    return (s || "").replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c] as string));
}

export async function GET() {
    const entries = (await getAllContentEntries()).slice(0, 50);

    const items = entries
        .map(
            (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${esc(e.url)}</link>
      <guid isPermaLink="true">${esc(e.url)}</guid>
      <pubDate>${e.publishedAt.toUTCString()}</pubDate>
      <description>${esc(e.description)}</description>${e.section ? `\n      <category>${esc(e.section)}</category>` : ""}
    </item>`
        )
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fernand Dédeh</title>
    <link>${SITE_URL}/fr</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Actualités, analyses et enquêtes de Fernand Dédeh — Côte d'Ivoire.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
