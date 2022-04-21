import { CHANGE_NAME, SIGN_IN, SIGN_OUT } from "./actions";


const initialState = {
    name: "Profile name",
    authed: false,
}

export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: payload.name,
            };
        case SIGN_IN:
            return {
                ...state,
                authed: true,
            };
        case SIGN_OUT:
            return {
                ...state,
                authed: false,
            };
        default:
            return state;
    }
}
