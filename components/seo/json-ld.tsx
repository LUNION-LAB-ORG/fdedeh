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

/**
 * Vidéo d'un article. Google exige une miniature : n'appeler que si elle existe.
 * `contentUrl` pour un fichier servi par le backend, `embedUrl` pour YouTube.
 */
export function videoObjectLd(opts: {
    name: string;
    description?: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
}): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: opts.name,
        // La description est obligatoire pour Google : à défaut d'extrait, le titre.
        description: opts.description || opts.name,
        thumbnailUrl: [opts.thumbnailUrl],
        uploadDate: opts.uploadDate,
        contentUrl: opts.contentUrl,
        embedUrl: opts.embedUrl,
    };
}
