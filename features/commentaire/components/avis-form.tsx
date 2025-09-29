import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from "@/components/ui/textarea";
import { CommentaireAddDTO, CommentaireAddSchema, CommentaireFormDto, CommentaireFormSchema } from "@/features/commentaire/commentaire.schema";
import { useAjouterCommentaireMutation } from "@/features/commentaire/queries/commentaire.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from 'react';
import { useForm } from "react-hook-form";

function AvisForm<T>({ data, type = "article" }: { data: T, type?: string }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<CommentaireFormDto>({
    resolver: zodResolver(CommentaireFormSchema),
    values: {
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
    const payload = {
      ...formData,
      entityId: data && typeof data === 'object' && 'id' in data ? (data as any).id.toString() : '',
      entityType: type,
    };

    ajouterCommentaire(payload)
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
        <ErrorMessage message={errors.comment?.message} />
      </div>
      {/* <div className="flex items-center mb-4 space-x-2">
        <Switch
          id='anonymous'
          checked={isAnonymous}
          onCheckedChange={(checked) => {
            setIsAnonymous(checked);
          }}
        />
        <Label htmlFor='anonymous'>Publier anonymement</Label>
      </div> */}
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