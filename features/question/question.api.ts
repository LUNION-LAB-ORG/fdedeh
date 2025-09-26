import {api} from "@/lib/api";
import {PaginatedResponse} from "@/types";
import {IQuestion} from "./question.type";

export interface IQuestionAPI {
	obtenirToutesQuestions(): Promise<PaginatedResponse<IQuestion>>;

	repondreQuestion(params: { questionId: string, response: string }): Promise<{ data: any }>;
}

export const questionApi: IQuestionAPI = {
	obtenirToutesQuestions(): Promise<PaginatedResponse<IQuestion>> {
		return api.request<PaginatedResponse<IQuestion>>({
			endpoint: `/questions`,
			method: "GET",
		});
	},

	repondreQuestion({questionId, response}): Promise<{ data: any }> {
		return api.request<{ data: any }>({
			endpoint: `/replies`, // Assuming this is the correct endpoint
			method: "POST",
			data: {reply: response, question_id: questionId}
		});
	}
};