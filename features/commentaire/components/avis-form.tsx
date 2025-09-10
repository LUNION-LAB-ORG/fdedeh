import React from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {CommentaireAddDTO, CommentaireAddSchema} from "@/features/commentaire/commentaire.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAjouterCommentaireMutation} from "@/features/commentaire/queries/commentaire.mutation";

function AvisForm<T>({data, type="article"}: { data?: T, type?: string }) {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset: resetForm,
	} = useForm<CommentaireAddDTO>({
		resolver: zodResolver(CommentaireAddSchema),
		values: {
			entityId: (data as any)?.id || '',
			entityType: type,
			email: '',
			fullName: '',
			comment: '',
		}
	});

	const {
		mutateAsync: ajouterCommentaire,
		isPending: isAddingCommentaire,
	} = useAjouterCommentaireMutation();

	const onSubmitForm = async (formData: CommentaireAddDTO) => {
		ajouterCommentaire(formData)
			.then(() => {
				resetForm();
			});
	}

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
			<h3 className="text-lg text-primary mb-4">
				Ajouter un avis
			</h3>
			<div className="mb-4">
				<Textarea
					className="text-sm bg-[#F5F5F5] focus:bg-white focus-visible:ring-1 focus-visible:ring-primary"
					placeholder="Rédiger un commentaire"
					rows={4}
					disabled={isAddingCommentaire}
					{...register('comment')}
				/>
				{errors.comment && (
					<p className="text-xs text-red-500">{errors.comment.message}</p>
				)}
			</div>
			<div className="grid sm:grid-cols-2 gap-4 mb-4">
				<div>
					<Input
						disabled={isAddingCommentaire}
						{...register('fullName')}
						type="text"
						placeholder="Nom & Prénoms"
						className="text-sm bg-[#F5F5F5] focus:bg-white focus-visible:ring-1 focus-visible:ring-primary"
					/>
					{errors.fullName && (
						<p className="text-xs text-red-500">{errors.fullName.message}</p>
					)}
				</div>
				<div>
					<Input
						disabled={isAddingCommentaire}
						{...register('email')}
						type="email"
						placeholder="Email"
						className="text-sm bg-[#F5F5F5] focus:bg-white focus-visible:ring-1 focus-visible:ring-primary"
					/>
					{errors.email && (
						<p className="text-xs text-red-500">{errors.email.message}</p>
					)}
				</div>
			</div>
			<Button type="submit" className="rounded-full bg-custom-gradient self-end">
				Ajouter
			</Button>
		</form>
	);
}

export default AvisForm;