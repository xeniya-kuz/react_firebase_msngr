import { STATUSES } from "../../utils/constants";

export const getAnimeList = state => state.anime.animeList;
export const getAnimeLoading = state => state.anime.request.status === STATUSES.LOADING;
export const getAnimeFailure = state => state.anime.request.error;