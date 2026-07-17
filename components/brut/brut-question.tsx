"use client";

import React from "react";
import Image from "next/image";
import { useQuestionStore } from "@/features/question/question.store";
import ResponseDialog from "@/features/question/components/response-dialog";

export function BrutQuestion() {
  const { getLatestQuestion } = useQuestionStore();
  const question = getLatestQuestion();

  if (!question) return null;

  return (
    <section className="pt-16">
      <span className="mb-3 inline-flex rounded-full bg-custom-gradient px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A0F00]">
        Question du jour
      </span>

      <div className="overflow-hidden rounded-2xl border border-brut-line bg-brut-surface">
        <div className="grid gap-6 p-4 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center sm:gap-8 sm:p-6">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
            <Image src="/images/all-img/daily-ask.jpg" alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 320px" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(21px,2.7vw,32px)] font-black leading-[1.1] -tracking-[0.025em] text-brut-ink text-balance">
              {question.body}
            </h2>
            <p className="mt-3 text-[15px] text-brut-muted">
              Partagez vos réflexions et engagez-vous dans la discussion.
            </p>
            <div className="mt-5">
              <ResponseDialog questionId={question.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrutQuestion;
