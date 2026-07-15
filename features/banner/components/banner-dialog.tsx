"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import ContactButton from "./contact-button";
import {useBannerStore} from "@/features/banner/banner.store";
import {addDomainToBackendImagePath} from "@/utils/image-utils";

const CLE_POPUP_FERME = "fdedeh:popup-ferme";

export default function BannerDialog() {
	const [open, setOpen] = useState(false);

	const {getBannerByPosition} = useBannerStore()

	const banner = getBannerByPosition('popup')

	// Ouvert depuis un effet, pas à l'initialisation : sessionStorage n'existe pas au rendu
	// serveur. La fermeture vaut pour la session — le trafic arrive de WhatsApp et de Google,
	// donc par chargement complet, et le popup se rouvrait à chaque page d'atterrissage.
	useEffect(() => {
		if (!banner) return;
		if (sessionStorage.getItem(CLE_POPUP_FERME) === "1") return;
		setOpen(true);
	}, [banner]);

	const handleClose = () => {
		sessionStorage.setItem(CLE_POPUP_FERME, "1");
		setOpen(false);
	}

	// Sans bannière, le dialogue s'affichait quand même : une boîte blanche vide
	// par-dessus la page.
	if (!banner) return null;

	return (
		<AlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogTrigger className="hidden"/>
			<AlertDialogContent
				className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full aspect-square p-2.5 max-h-screen">
				<ContactButton/>
				<Button size="icon" className="absolute right-2 top-2 rounded-full bg-custom-gradient z-10"
				        onClick={handleClose}>
					<span className="sr-only">Close</span>
					<X/>
				</Button>
				<AlertDialogHeader className="sr-only">
					<AlertDialogTitle className="sr-only">Bienvenue sur FDedeh!</AlertDialogTitle>
				</AlertDialogHeader>
				<Image
					src={addDomainToBackendImagePath(banner.image_path)}
					alt="Banner"
					className="aspect-square"
					width={650}
					height={650}
					priority
				/>
			</AlertDialogContent>
		</AlertDialog>
	);
}