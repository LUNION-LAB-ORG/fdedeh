import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Galerie",
  description: "La galerie vidéo de fd.info, bientôt disponible.",
};

function GaleriePage() {
  return (
    <>
      <BrutPageHeader eyebrow="Le média" title="Galerie" subtitle="Nos contenus vidéo, en images." />
      <div className="px-6 py-12 lg:px-11">
        <ComingSoon
          title="La galerie sera bientôt disponible."
          description="Nous travaillons à la mise en place de cette section. Revenez bientôt pour découvrir nos vidéos."
        />
      </div>
    </>
  );
}

export default GaleriePage;
