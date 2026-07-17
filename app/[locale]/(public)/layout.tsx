import React from "react";
import { BrutSidebar } from "@/components/brut/brut-sidebar";
import { BrutMobileHeader } from "@/components/brut/brut-mobile-header";
import { BrutBottomNav } from "@/components/brut/brut-bottom-nav";
import { BrutFooter } from "@/components/brut/brut-footer";
import BannerDialog from "@/features/banner/components/banner-dialog";

const LayoutPublic = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh bg-brut-ground text-brut-ink">
      <BrutSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <BrutMobileHeader />
        <main className="flex-1">{children}</main>
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
