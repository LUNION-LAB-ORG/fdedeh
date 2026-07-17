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
import { cn } from "@/lib/utils";

function AvisForm<T>({
  data,
  type = "article",
  parentId,
  compact = false,
  onSubmitted,
}: {
  data: T;
  type?: string;
  parentId?: number | string;
  compact?: boolean;
  onSubmitted?: () => void;
}) {
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

  useEffect(() => {
    jetonVisiteur();
    const id = lireIdentiteVisiteur();
    if (id) {
      setValue('fullName', id.fullName);
      setValue('email', id.email);
      setIdentiteConnue(id.fullName);
    } else {
      setModifierIdentite(true);
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
      ...(parentId ? { parentId } : {}),
    };

    await ajouterCommentaire(payload);

    memoriserIdentiteVisiteur({ fullName: formData.fullName, email: formData.email });
    setIdentiteConnue(formData.fullName);
    setModifierIdentite(false);
    resetForm({ fullName: formData.fullName, email: formData.email, comment: '' });
    onSubmitted?.();
  }

  const champsIdentiteVisibles = modifierIdentite || !identiteConnue;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col">
      {!compact && (
        <h3 className="mb-4 font-display text-[18px] font-black -tracking-[0.02em] text-brut-ink">
          Ajouter un commentaire
        </h3>
      )}
      <div className="mb-3">
        <Textarea
          className="rounded-xl border-brut-line bg-brut-raise text-[14px] focus-visible:ring-1 focus-visible:ring-brut-signal"
          placeholder={compact ? "Votre réponse…" : "Partagez votre avis…"}
          rows={compact ? 2 : 4}
          disabled={isAddingCommentaire}
          {...register('comment')}
        />
        <ErrorMessage message={errors.comment?.message} />
      </div>

      {champsIdentiteVisibles ? (
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <div>
            <Input
              disabled={isAddingCommentaire}
              {...register('fullName')}
              type="text"
              placeholder="Nom & Prénoms"
              className="rounded-xl border-brut-line bg-brut-raise text-[14px] focus-visible:ring-1 focus-visible:ring-brut-signal"
            />
            <ErrorMessage message={errors.fullName?.message} />
          </div>
          <div>
            <Input
              disabled={isAddingCommentaire}
              {...register('email')}
              type="email"
              placeholder="Email"
              className="rounded-xl border-brut-line bg-brut-raise text-[14px] focus-visible:ring-1 focus-visible:ring-brut-signal"
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
      ) : (
        <div className="mb-3 text-[13px] text-brut-muted">
          {compact ? "Réponse en tant que " : "Vous commentez en tant que "}
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

      <Button
        type="submit"
        className={cn("self-end rounded-full bg-custom-gradient font-semibold text-white", compact && "h-9 px-4 text-[13px]")}
      >
        {compact ? "Répondre" : "Publier"}
        {isAddingCommentaire && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
}

function ErrorMessage({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <small className="mt-1 text-xs text-red-500">{message}</small>
  );
}

export default AvisForm;
