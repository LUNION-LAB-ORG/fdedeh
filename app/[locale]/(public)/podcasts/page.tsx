import React from "react";
import { Metadata } from "next";
import { BrutPageHeader } from "@/components/brut/brut-page-header";
import EmissionCard from "@/components/emission/podcast/emission-card";
import { emissionsList } from "@/app/api/emissions";

export const metadata: Metadata = {
  title: "Podcasts",
  description: "Les émissions et interviews audio de fd.info.",
};

function PodcastsPage() {
  return (
    <>
      <BrutPageHeader
        eyebrow="Le média"
        title="Podcasts"
        subtitle="Nos émissions et interviews à écouter. Car fd.info, c'est aussi de l'audio."
      />
      <div className="px-6 py-12 lg:px-11">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {emissionsList.slice(0, 3).map((emission) => (
            <EmissionCard key={emission.id} emission={emission} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PodcastsPage;
