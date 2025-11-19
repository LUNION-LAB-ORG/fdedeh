import {create} from 'zustand';
import {IBanner} from "@/features/banner/banner.type";

interface BannerStoreState {
	allBanners: IBanner[];

	// react query
	isLoading: boolean;
	isError: boolean;
	error: any | null;
	isFetching: boolean;

	setAllBanners: (banners: IBanner[]) => void;
	setQueryState: (state: { isLoading: boolean, isError: boolean, error: any, isFetching: boolean }) => void;

	// Utilitaires pour calculer les bannières filtrées
	getBannerByPosition: (position: string) => IBanner | undefined;
}

export const useBannerStore = create<BannerStoreState>((set, getState) => ({
	allBanners: [],
	isLoading: false,
	isError: false,
	error: null,
	isFetching: false,

	setAllBanners: (banners: IBanner[]) => set({allBanners: banners}),
	setQueryState: (state) => set(state),

	getBannerByPosition: (position: string) => {
		return getState().allBanners.find(banner => banner.position.toLowerCase() == position.toLowerCase());
	},
}));


