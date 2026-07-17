"use client";

import React, { useState } from "react";
import Image from "next/image";
import { addDomainToBackendImagePath } from "@/utils/image-utils";
import { cn } from "@/lib/utils";

// Affiche une photo dans son intégralité : on mesure son ratio réel et on cale
// le conteneur dessus. object-cover remplit alors exactement — image entière,
// aucune zone vide, sans bordure ni recadrage.
export function BrutContentImage({
  path,
  alt = "",
  className,
  sizes,
  priority,
}: {
  path?: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [ratio, setRatio] = useState<number | null>(null);

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{ aspectRatio: ratio ? String(ratio) : "3 / 2" }}
    >
      <Image
        src={addDomainToBackendImagePath(path)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 720px"}
        className="object-cover"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </div>
  );
}

export default BrutContentImage;
