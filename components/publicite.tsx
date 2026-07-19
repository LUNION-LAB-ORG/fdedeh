"use client";

import React from "react";
import { AdSlot } from "@/components/ad-slot";

/**
 * Compat : ancien composant de pub par « position ». Délègue désormais à AdSlot,
 * qui interroge le serveur de diffusion (planning, ciblage, plafonds, tracking).
 * La position historique (ex. SIDEBAR_RIGHT) devient un code de zone (sidebar_right).
 */
function Publicite({
	bannerPosition,
	className,
	label = true,
}: {
	bannerPosition?: string;
	className?: string;
	label?: boolean;
}) {
	const zone = (bannerPosition || "homepage_top").toLowerCase();
	return <AdSlot zone={zone} className={className} label={label} />;
}

export default Publicite;
