import React from "react";
import { SITE_URL } from "@/lib/seo/content";

/** Injecte un bloc JSON-LD (données structurées Schema.org). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // Échappe < pour empêcher toute fermeture prématurée de </script>.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}

const LOGO = `${SITE_URL}/og-homepage-info.png`;
const SOCIALS = [
    "https://www.facebook.com/fernand.tagro",
    "https://x.com/FernandDdeh",
    "https://www.youtube.com/@fernanddedeh1580",
];

export function organizationLd(): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        name: "Fernand Dédeh",
        url: `${SITE_URL}/fr`,
        logo: LOGO,
        sameAs: SOCIALS,
    };
}

export function websiteLd(): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Fernand Dédeh",
        url: `${SITE_URL}/fr`,
        inLanguage: "fr",
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/fr/a-la-une?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

export function newsArticleLd(opts: {
    headline: string;
    description?: string;
    url: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    section?: string;
    authorName?: string;
}): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: (opts.headline || "").slice(0, 110),
        description: opts.description,
        image: opts.image ? [opts.image] : undefined,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified || opts.datePublished,
        articleSection: opts.section,
        author: { "@type": "Organization", name: opts.authorName || "Fernand Dédeh" },
        publisher: {
            "@type": "Organization",
            name: "Fernand Dédeh",
            logo: { "@type": "ImageObject", url: LOGO },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
        url: opts.url,
    };
}
