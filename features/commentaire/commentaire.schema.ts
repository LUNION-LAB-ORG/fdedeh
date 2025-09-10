import {z} from 'zod';

export const CommentaireAddSchema = z.object({
	entityId: z.string("L'ID de l'entité est requis"),
	entityType: z.string({message: "Le type d'entité est requis"})
		.min(2, "Le type d'entité doit contenir au moins 2 caractères")
		.max(50, "Le type d'entité ne doit pas dépasser 50 caractères")
		.trim(),
	fullName: z.string({message: "Le nom complet est requis"})
		.min(2, "Le nom complet doit contenir au moins 2 caractères")
		.max(100, "Le nom complet ne doit pas dépasser 100 caractères")
		.trim(),
	email: z.email("L'email doit être une adresse valide")
		.max(100, "L'email ne doit pas dépasser 100 caractères")
		.toLowerCase()
		.trim(),
	comment: z.string({message: "Le commentaire est requis"})
		.min(5, "Le commentaire doit contenir au moins 5 caractères")
		.max(1000, "Le commentaire ne doit pas dépasser 255 caractères")
		.trim(),
});

export const CommentaireUpdateSchema = CommentaireAddSchema.partial();

export type CommentaireAddDTO = z.infer<typeof CommentaireAddSchema>;
export type CommentaireUpdateDTO = z.infer<typeof CommentaireUpdateSchema>;