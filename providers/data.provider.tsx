"use client";

import React, { useEffect } from "react";
import { useArticleStore } from "@/features/articles/stores/article.store";
import { useArticleListQuery } from "@/features/articles/queries/article-list.query";
import { useDailyListQuery } from "@/features/dailies/query/dailies-list.query";
import { useDailyStore } from "@/features/dailies/store/dailiesStore";
import { useBannerListQuery } from "@/features/banner/queries/banner-list";
import { useBannerStore } from "@/features/banner/banner.store";
import { useFlashStore } from "@/features/infos-flash/flash.store";
import { useExclusivityListQuery } from "@/features/infos-flash/queries/flash-list";
import { useQuestionListQuery } from "@/features/question/queries/question-list";
import { useQuestionStore } from "@/features/question/question.store";

export default function DataProvider() {
	const {
		data,
		isLoading,
		isError,
		error,
		isFetching
	} = useArticleListQuery({})


	const {
		data: dailies,
		isLoading: dailiesLoading,
		isError: dailiesIsError,
		error: dailiesError,
		isFetching: dailiesIsFetching
	} = useDailyListQuery();


	const {
		data: bannersList,
		isLoading: bannersLoading,
		isError: bannersIsError,
		error: bannersError,
		isFetching: bannersIsFetching
	} = useBannerListQuery();


	const {
		data: exclusivities,
		isLoading: exclusivitiesLoading,
		isError: exclusivitiesIsError,
		error: exclusivitiesError,
		isFetching: exclusivitiesIsFetching
	} = useExclusivityListQuery();


	const {
		data: questionsData,
		isLoading: questionsLoading,
		isError: questionsIsError,
		error: questionsError,
		isFetching: questionsIsFetching
	} = useQuestionListQuery();

	// Mémorisation des listes pour éviter les recalculs inutiles
	const articlesList = React.useMemo(() => data?.data || [], [data]);
	const dailiesList = React.useMemo(() => {
		return dailies?.data || []; // Adaptez selon la structure réelle de `dailies`
	}, [dailies]);
	const banners = React.useMemo(() => bannersList?.data || [], [bannersList]);
	const flashInfos = React.useMemo(() => exclusivities?.data || [], [exclusivities]);

	// Stockage dans Zustand
	const { setAllArticles, setQueryState } = useArticleStore();
	const { setAllDailies, setQueryState: setDailyQueryState } = useDailyStore();
	const { setAllBanners, setQueryState: setBannerQueryState } = useBannerStore();
	const { setAllFlashInfos, setQueryState: setFlashQueryState } = useFlashStore();
	const { setAllQuestions, setQueryState: setQuestionsQueryState } = useQuestionStore();


	// Effets pour mettre à jour les états
	useEffect(() => {
		setQueryState({ isLoading, isError, error, isFetching });
		if (data?.data?.length) {
			setAllArticles(data.data);
		}
	}, [isLoading, isError, error, isFetching, setQueryState, data, setAllArticles]);

	useEffect(() => {
		if (questionsData?.data?.length) {
			setAllQuestions(questionsData.data);
		} else {
			setAllQuestions([]);
		}
		setQueryState({
			isLoading: questionsLoading,
			isError: questionsIsError,
			error: questionsError,
			isFetching: questionsIsFetching
		});
		// Nettoyage lors du démontage du composant
		return () => {
			setAllQuestions([]);
			setQuestionsQueryState({
				isLoading: false,
				isError: false,
				error: null,
				isFetching: false
			});
		}
	}, [questionsData, questionsError, questionsIsError, questionsIsFetching, questionsLoading, setAllQuestions, setQueryState]);

	useEffect(() => {
		setBannerQueryState({
			isLoading: bannersLoading,
			isError: bannersIsError,
			error: bannersError,
			isFetching: bannersIsFetching
		});
	}, [bannersLoading, bannersIsError, bannersError, bannersIsFetching, setBannerQueryState]);

	useEffect(() => {
		if (banners.length) setAllBanners(banners);
	}, [banners, setAllBanners]);

	useEffect(() => {
		if (flashInfos.length) setAllFlashInfos(flashInfos);
	}, [flashInfos, setAllFlashInfos]);


	useEffect(() => {
		if (dailiesList.length) setAllDailies(dailiesList);
	}, [dailiesList, setAllDailies]);

	useEffect(() => {
		setDailyQueryState({
			isLoading: dailiesLoading,
			isError: dailiesIsError,
			error: dailiesError,
			isFetching: false
		});
	}, [dailiesLoading, dailiesIsError, dailiesError, setDailyQueryState]);

	useEffect(() => {
		setFlashQueryState({
			isLoading: exclusivitiesLoading,
			isError: exclusivitiesIsError,
			error: exclusivitiesError,
			isFetching: exclusivitiesIsFetching
		});
	}, [exclusivitiesLoading, exclusivitiesIsError, exclusivitiesError, exclusivitiesIsFetching, setFlashQueryState]);

	return null;
}
