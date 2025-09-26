"use client";
import React from 'react';
import SectionTitle from "@/components/section-title";
import Image from "next/image";
import { useQuestionStore } from "@/features/question/question.store";
import ResponseDialog from "@/features/question/components/response-dialog";

function DailyAsk() {
  const { getLatestQuestion } = useQuestionStore();

  const question = getLatestQuestion();

  return (
    <section className="py-8">
      <SectionTitle text="Question du jour" className="mb-6" />
      <div className="bg-[#F2F2F7] rounded-2xl flex flex-wrap max-md:items-center py-3 px-2">
        <div
          className="relative overflow-hidden rounded-2xl w-full sm:w-[300px] max-md:h-48 flex items-center justify-center"
        >
          <Image src="/images/all-img/daily-ask.jpg" alt="Question du jour" width={400} height={267} />
        </div>
        <article className="flex flex-col flex-1">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {question ? question.body : "Aucune question disponible pour le moment."}
            </h3>
            <p className="text-gray-600 mb-4">
              {question ? `Partagez vos réflexions et engagez-vous dans la discussion.` : "Veuillez revenir plus tard pour une nouvelle question."}
            </p>
            {question && <ResponseDialog questionId={question.id} />}
          </div>
        </article>
      </div>
    </section>
  );
}

export default DailyAsk;