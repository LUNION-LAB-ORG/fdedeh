import React from "react";
import { BrutSidebar } from "@/components/brut/brut-sidebar";
import { BrutMobileHeader } from "@/components/brut/brut-mobile-header";
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
      </div>
      <BannerDialog />
    </div>
  );
};

export default LayoutPublic;
