"use client";
import {Share2, Facebook, Link2, Twitter} from "lucide-react";
import ShareButton from "@/components/ui/share-button";
import {toast} from "sonner";
import {sendGAEvent} from "@next/third-parties/google";

function SocialShare() {
    const baseUrl = window.location.href;

    function withUTM(url: string, source: string) {
        const utm = `utm_source=${source}&utm_medium=social&utm_campaign=share_button`;
        return `${url}${url.includes('?') ? '&' : '?'}${utm}`;
    }

    const sendShareEvent = (platform: string) => {
        sendGAEvent('page_shared', platform, {url: window.location.href});
    }

    const shareLinks = [
        {
            icon: Twitter,
            onClick: () => {
                const shareUrl = withUTM(baseUrl, 'twitter');
                sendShareEvent('twitter');
                window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}`);
            },
            label: "Partager sur Twitter",
        },
        {
            icon: Facebook,
            onClick: () => {
                const shareUrl = withUTM(baseUrl, 'facebook');
                sendShareEvent('facebook');
                window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
            },
            label: "Partager sur Facebook",
        },
        {
            icon: Link2,
            onClick: () => {
                const shareUrl = withUTM(baseUrl, 'link_copied');
                sendShareEvent('link_copied');
                navigator.clipboard.writeText(shareUrl);
                toast.success("Lien copié avec UTM");
            },
            label: "Copier le lien",
        },
    ];

    return (
        <div className="inline-flex">
            <ShareButton links={shareLinks}>
                <Share2/>
                Partager
            </ShareButton>
        </div>
    );
}

export default SocialShare;