import React from 'react';
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/utils";

type FooterColumnProps = {
    links: { text: string; href: string }[];
    title: string;
    className?: string;
}

function FooterColumn({links, title, className}: FooterColumnProps) {
    return (
        <div className={cn("text-center sm:text-left", className)}>
            <div className="text-lg font-medium border-b border-[#2E2E2E]">
                <p className="border-b border-white pb-2 text-center sm:text-left">{title}</p>
            </div>
            <ul className="mt-8 space-y-4 text-sm list-disc">
                {links.map(({text, href}) => (
                    <li key={text} className="border-b border-[#2E2E2E] hover:border-white transition duration-200">
                        <Link
                            className="transition block pb-2"
                            href={href}
                        >
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterColumn;