import { z } from "zod";


export const StatsSchema = z.object({
	type: z.string(),
	id: z.string(),
	event: z.enum(["view", "read", "click"]),
});

export type Stats = z.infer<typeof StatsSchema>;
export type StatsDto = z.infer<typeof StatsSchema>;