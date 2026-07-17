"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentaireAddDTO, CommentaireFormDto, CommentaireFormSchema } from "@/features/commentaire/commentaire.schema";
import { useAjouterCommentaireMutation } from "@/features/commentaire/queries/commentaire.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { jetonVisiteur, lireIdentiteVisiteur, memoriserIdentiteVisiteur } from "@/utils/visitor";

function AvisForm<T>({ data, type = "article" }: { data: T, type?: string }) {
  // Identité connue (mémorisée dans le navigateur) + affichage ou non des champs.
  const [identiteConnue, setIdentiteConnue] = useState<string | null>(null);
  const [modifierIdentite, setModifierIdentite] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    setValue,
  } = useForm<CommentaireFormDto>({
    resolver: zodResolver(CommentaireFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      comment: '',
    }
  });

  // Reconnait le visiteur depuis son navigateur (une fois, côté client).
  useEffect(() => {
    jetonVisiteur(); // garantit un jeton d'appareil stable
    const id = lireIdentiteVisiteur();
    if (id) {
      setValue('fullName', id.fullName);
      setValue('email', id.email);
      setIdentiteConnue(id.fullName);
    } else {
      setModifierIdentite(true); // inconnu : on montre les champs
    }
  }, [setValue]);

  const {
    mutateAsync: ajouterCommentaire,
    isPending: isAddingCommentaire,
  } = useAjouterCommentaireMutation();

  const onSubmitForm = async (formData: CommentaireAddDTO) => {
    const payload = {
      ...formData,
      entityId: data && typeof data === 'object' && 'id' in data ? (data as any).id.toString() : '',
      entityType: type,
    };

    await ajouterCommentaire(payload);

    // On mémorise l'identité pour ne plus la redemander, et on ne vide que le message.
    memoriserIdentiteVisiteur({ fullName: formData.fullName, email: formData.email });
    setIdentiteConnue(formData.fullName);
    setModifierIdentite(false);
    resetForm({ fullName: formData.fullName, email: formData.email, comment: '' });
  }

  const champsIdentiteVisibles = modifierIdentite || !identiteConnue;

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
        <ErrorMessage message={errors.comment?.message} />
      </div>

      {champsIdentiteVisibles ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              disabled={isAddingCommentaire}
              {...register('fullName')}
              type="text"
              placeholder="Nom & Prénoms"
              className="text-sm bg-[#F5F5F5] focus:bg-white focus-visible:ring-1 focus-visible:ring-primary"
            />
            <ErrorMessage message={errors.fullName?.message} />
          </div>
          <div>
            <Input
              disabled={isAddingCommentaire}
              {...register('email')}
              type="email"
              placeholder="Email"
              className="text-sm bg-[#F5F5F5] focus:bg-white focus-visible:ring-1 focus-visible:ring-primary"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
      ) : (
        <div className="mb-4 text-sm text-brut-muted">
          Vous commentez en tant que{" "}
          <span className="font-semibold text-brut-ink">{identiteConnue}</span>
          {" · "}
          <button
            type="button"
            onClick={() => setModifierIdentite(true)}
            className="font-semibold text-brut-signal hover:underline"
          >
            changer
          </button>
        </div>
      )}

      <Button type="submit" className="rounded-full bg-custom-gradient self-end">
        Ajouter
        {isAddingCommentaire && <Loader className={`ml-2 h-4 w-4 animate-spin`} />}
      </Button>
    </form>
  );
}

function ErrorMessage({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <small className="text-xs text-red-500 mt-1">{message}</small>
  );
}

export default AvisForm;
