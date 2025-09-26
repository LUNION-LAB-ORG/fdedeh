import {useEffect} from "react";
import {sendGAEvent} from "@next/third-parties/google";

// Fonction pour envoyer les stats au backend (à implémenter plus tard)
async function sendStatsToBackend(eventType: string, data: any) {
	// await fetch("/api/stats", { method: "POST", body: JSON.stringify({ eventType, ...data }) });
}

type StatsData = {
	entitySlug?: string;
	entityId?: string | number;
	timeSpent?: number;
};

export function useStats({entityType, entitySlug, entityId,}: StatsData) {
	useEffect(() => {
		const begin = Date.now();
		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8) {
				sendGAEvent("event", `${entityType}_lu`, {
					entity_slug: entitySlug,
					entity_id: entityId,
				});
				sendStatsToBackend(`${entityType}_lu`, {entitySlug, entityId});
				window.removeEventListener("scroll", handleScroll);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			const timeSpent = Date.now() - begin;
			sendGAEvent("event", `${entityType}_vu`, {
				entity_slug: entitySlug,
				entity_id: entityId,
				time_spent: timeSpent,
			});
			sendStatsToBackend(`${entityType}_vu`, {entitySlug, entityId, timeSpent});
			window.removeEventListener("scroll", handleScroll);
		};
	}, [entityType, entitySlug, entityId]);
}