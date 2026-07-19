import React from "react";
import { BrutSidebar } from "@/components/brut/brut-sidebar";
import { BrutMobileHeader } from "@/components/brut/brut-mobile-header";
import { BrutBottomNav } from "@/components/brut/brut-bottom-nav";
import { BrutFooter } from "@/components/brut/brut-footer";
import BannerDialog from "@/features/banner/components/banner-dialog";
import { AdSlot } from "@/components/ad-slot";

const LayoutPublic = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh bg-brut-ground text-brut-ink">
      <BrutSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <BrutMobileHeader />
        {/* Emplacement pub — mobile haut (mobile uniquement) */}
        <div className="px-4 pt-4 lg:hidden">
          <AdSlot zone="mobile_top" />
        </div>
        <main className="flex-1">{children}</main>
        {/* Emplacement pub — mobile bas (mobile uniquement) */}
        <div className="px-4 pb-2 lg:hidden">
          <AdSlot zone="mobile_bottom" />
        </div>
        {/* Emplacement pub — pied de page (toutes les pages) */}
        <div className="px-6 py-8 lg:px-11">
          <AdSlot zone="footer" className="max-w-5xl" />
        </div>
        <BrutFooter />
        {/* Espace pour que le footer ne passe pas sous la bottom nav mobile. */}
        <div className="h-[calc(58px+env(safe-area-inset-bottom))] lg:hidden" aria-hidden />
      </div>
      <BannerDialog />
      <BrutBottomNav />
    </div>
  );
};

export default LayoutPublic;
