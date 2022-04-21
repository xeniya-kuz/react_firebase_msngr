import { DELETED } from "./actions";

const initialState = {
    // флаг для редиректа при удалении чата
    deleted: false,
};


export const chatListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DELETED:
            return {
                ...state,
                deleted: payload.deleted
            };
        default:
            return state;
    };
};

