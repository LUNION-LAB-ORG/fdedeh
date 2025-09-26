export interface IStats {
	type: string;
	id: string;
	event: "view" | "read" | "click";
}