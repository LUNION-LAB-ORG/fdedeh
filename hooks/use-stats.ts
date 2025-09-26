import { useEnregistrerStatsMutation } from "@/features/stats/queries/stats.mutation";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

export function useStats({
	type,
	id
}: { type?: string; id?: string | number }) {
	const {
		mutateAsync: sendStatsToBackend,
		isPending: isSendingStats,
	} = useEnregistrerStatsMutation();

	useEffect(() => {
		if (!type || !id) return;

		const begin = Date.now();

		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8) {
				sendGAEvent("event", `${type}_read`, {
					entity_slug: id,
					time_spent: Date.now() - begin,
				});
				sendStatsToBackend({
					type,
					id: id ? String(id) : "unknown",
					event: "read",
				});
				window.removeEventListener("scroll", handleScroll);
			}
		};

		// Apres 10 secondes envoyer la stats view
		const timer = setTimeout(() => {
			sendGAEvent("event", `${type}_view`, {
				entity_slug: id,
				time_spent: Date.now() - begin,
			});
			sendStatsToBackend({
				type,
				id: id ? String(id) : "unknown",
				event: "view",
			});
			sendStatsToBackend({
				type,
				id: id ? String(id) : "unknown",
				event: "click",
			});
		}, 10 * 1000);

		window.addEventListener("scroll", handleScroll);
		return () => {
			const timeSpent = Date.now() - begin;

			sendGAEvent("event", `${type}_view`, {
				entity_slug: id,
				time_spent: timeSpent,
			});

			clearTimeout(timer);

			window.removeEventListener("scroll", handleScroll);
		};
	}, [type, id, sendStatsToBackend]);
}