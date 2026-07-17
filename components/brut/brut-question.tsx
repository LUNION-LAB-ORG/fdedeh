"use client";

import React from "react";
import { useQuestionStore } from "@/features/question/question.store";
import ResponseDialog from "@/features/question/components/response-dialog";

export function BrutQuestion() {
  const { getLatestQuestion } = useQuestionStore();
  const question = getLatestQuestion();

  if (!question) return null;

  return (
    <section className="pt-16">
      <div className="overflow-hidden rounded-2xl bg-brut-ink text-brut-ground">
        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.14em] text-brut-signal">Question du jour</p>
            <h2 className="font-display text-[clamp(23px,3.4vw,34px)] font-black leading-[1.08] -tracking-[0.03em]">
              {question.body}
            </h2>
            <p className="mt-4 text-[15px] text-brut-ground/70">
              Partagez votre point de vue et engagez la discussion.
            </p>
          </div>
          <div className="shrink-0">
            <ResponseDialog questionId={question.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrutQuestion;
