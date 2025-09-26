"use client";

import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reponseQuestionAddSchema } from "@/features/question/question.schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { questionApi } from "@/features/question/question.api";
import { toast } from "sonner";
import { z } from "zod";

function ResponseDialog({ questionId }: { questionId: string }) {

	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof reponseQuestionAddSchema>>({
		resolver: zodResolver(reponseQuestionAddSchema),
		defaultValues: {
			contenu: '',
		}
	})

	function onSubmit(values: z.infer<typeof reponseQuestionAddSchema>) {
		questionApi.repondreQuestion({
			questionId: questionId,
			response: values.contenu,
		}).then(res => {
			if (res.data) {
				toast.success("Réponse envoyée avec succès !");
				form.reset();
			} else {
				console.error(res)
				toast.error("Erreur lors de l'envoi de la réponse.");
			}

			setOpen(false);
		}).catch(err => {
			console.error(err)
			toast.error("Erreur lors de l'envoi de la réponse.");
		});
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					type={"button"}
					className="bg-[#FF8D28] text-white px-4 py-2 rounded-lg hover:bg-[#e07b22] transition-colors"
				>
					Répondre
				</Button>
			</DialogTrigger>
			<DialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>
								Répondre à la question du jour
							</DialogTitle>
							<DialogDescription>
								Vous pouvez partager vos pensées et opinions ici.
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="contenu"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Votre réponse</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Écrivez votre réponse ici..."
											className="min-h-[120px]"
											maxLength={1000}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Partagez vos pensées et opinions.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								className="bg-[#FF8D28] text-white px-4 py-2 rounded-lg hover:bg-[#e07b22] transition-colors"
							>
								Répondre
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default ResponseDialog;