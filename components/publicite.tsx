"use client";
import React from 'react';
import {Megaphone} from "lucide-react";
import {cn} from "@/lib/utils";
import {useBannerStore} from "@/features/banner/banner.store";
import {addDomainToBackendImagePath} from "@/utils/image-utils";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import {BannerPosition} from "@/features/banner/banner.type";
import {positionToOrientation} from "@/features/banner/utils/position-utils";

function Publicite({bannerPosition, ...props}: React.HTMLAttributes<HTMLDivElement> & {
	bannerPosition?: BannerPosition
}) {
	const {getBannerByPosition} = useBannerStore()

	const banner = getBannerByPosition(bannerPosition || 'home_top')

	if (banner) {
		const orientation = positionToOrientation(banner.position)
		return (
			<Link href={banner.link} className={cn("items-center justify-center", props.className, orientation == 'horizontal' ? 'aspect-[4/1]' : 'aspect-[1/1]')} target="_blank" rel="noopener noreferrer">
				<Image
					className="rounded"
					src={addDomainToBackendImagePath(banner.image_path)}
					alt={banner.position || "Publicité"}
					width={orientation == 'horizontal' ? 1232 : 400}
					height={orientation == 'horizontal' ? 260 : 400}
					layout="responsive"
				/>
			</Link>
		);
	}

	return null;

	// return (
	// 	<div {...props} className={cn('bg-gray-200 rounded-xl flex flex-col items-center justify-center', props.className)}>
	// 		<Megaphone
	// 			className="w-full h-1/2 text-gray-500"
	// 			size={64}
	// 			strokeWidth={1.5}
	// 			style={{display: 'block', margin: '0 auto'}}
	// 		/>
	// 		<p className="text-center text-gray-600 mt-2">
	// 			Publicité ici
	// 		</p>
	// 	</div>
	// );
}

export default Publicite;