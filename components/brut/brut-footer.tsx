import React from "react";
import { Link } from "@/i18n/navigation";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { RUBRIQUES, MEDIA, NavItem } from "./nav-data";

function FooterCol({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{title}</div>
      {items.map((item) => (
        <Link
          key={item.name + item.href}
          href={item.href}
          className="text-[15px] font-medium text-white/75 transition-colors hover:text-white"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export function BrutFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#141009] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-11">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="font-display text-[52px] font-black leading-none -tracking-[0.05em]">
              fd<span className="text-brut-signal">.</span>info
            </div>
            <p className="mt-4 max-w-xs text-[15px] font-semibold text-white/80">
              Le portail de référence de l&apos;actualité ivoirienne.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Rubriques" items={RUBRIQUES} />
          <FooterCol title="Le média" items={MEDIA} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Fernand Dédeh — Développé par{" "}
            <a
              href="https://www.lunion-lab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 transition-colors hover:text-brut-signal"
            >
              LUNION-LAB
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default BrutFooter;
