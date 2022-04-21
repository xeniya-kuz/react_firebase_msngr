import { STATUSES } from "../../utils/constants";
import { REQUEST_ANIME_FAILURE, REQUEST_ANIME_LOADING, REQUEST_ANIME_SUCCESS } from "./actions";

const initialState = {
    animeList: [],
    request: {
        // здесь хранятся статусы запроса
        status: STATUSES.IDLE,
        error: "",
    }
};

export const animeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ANIME_LOADING:
            return {
                ...state,
                request: {
                    ...state.request,
                    status: STATUSES.LOADING,
                }
            };
        case REQUEST_ANIME_SUCCESS:
            return {
                ...state,
                animeList: action.animeList,
                request: {
                    status: STATUSES.SUCCESS,
                    error: "",
                }
            };
        case REQUEST_ANIME_FAILURE:
            return {
                ...state,
                request: {
                    status: STATUSES.FAILURE,
                    error: "Ошибка",
                }
            };
        default:
            return state;
    }
}