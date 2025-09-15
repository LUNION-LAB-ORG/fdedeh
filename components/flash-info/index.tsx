"use client";

import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFlashStore } from "@/features/infos-flash/flash.store";
import Image from 'next/image';

function FlashInfo() {
	const { getActiveFlashInfos } = useFlashStore();
	const activeFlashInfos = getActiveFlashInfos();

	if (activeFlashInfos.length === 0) {
		return null; // Pas d'infos flash actives
	}

	const duplicatedInfos = [...activeFlashInfos, ...activeFlashInfos];


	return (
		<div className="bg-custom-gradient text-white py-1 md:py-2 z-10 overflow-hidden">
			<div className="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-6">
				<div className="flex items-center justify-between gap-1 sm:gap-3">
					<div className="flex items-center self-start sm:self-auto">
						<h2 className="uppercase font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl w-max pr-3">
							Flash Infos
						</h2>
						<div className="h-6 sm:h-8 md:h-10 lg:h-12 w-0.5 sm:w-1 bg-white" aria-label="Flash Info Indicator" />
					</div>

					<div className="flex items-center w-full pl-0 overflow-hidden">
						<LogoWhite className="hidden md:block w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex-shrink-0" />
						<div className="ml-1 sm:ml-2 md:ml-3 text-xs sm:text-sm md:text-base lg:text-lg relative h-6 sm:h-7 overflow-hidden w-full">
							<motion.div
								className="flex whitespace-nowrap max-sm:py-2 absolute"
								animate={{
									x: [0, -1 * activeFlashInfos.reduce((acc, info) => acc + (info.title.length + info.body.length) * 8, 0)]
								}}
								transition={{
									repeat: Infinity,
									duration: activeFlashInfos.length * 20,
									ease: "linear"
								}}
							>
								{duplicatedInfos.map((info, index) => (
									<a
										href={info.link || "#"}
										target={info.link ? "_blank" : undefined}
										rel="noopener noreferrer"
										key={`${info.id}-${index}`}
										className="mr-20 flex-shrink-0"
									>
										<span className="uppercase mr-1">{info.title}:</span>
										{info.body}
									</a>
								))}
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function LogoWhite({ className }: { className?: string }) {
	return (
		<Image
			className={cn("object-contain", className)}
			src="/fd-info-blanc.png"
			alt="Logo"
			width={40}
			height={40}
			priority={false}
		/>
	);
}

export default FlashInfo;