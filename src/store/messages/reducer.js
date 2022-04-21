import { IS_CHANGE_MESSAGE } from "./actions";


const initialMessages = {
    changed: {
        change: false,
        changeId: null,
        text: ''
    },
};


export const messagesReducer = (state = initialMessages, { type, payload }) => {
    switch (type) {
        case IS_CHANGE_MESSAGE:
            return {
                ...state,
                changed:
                {
                    // статус изменения какого-либо сообщения
                    change: payload.change,
                    // id изменяемого сообщения
                    changeId: payload.changeId,
                    // также передаем текст, чтобы потом вставить его в value в компоненте Form
                    text: payload.text
                }
            }
        default:
            return state;
    };
};

