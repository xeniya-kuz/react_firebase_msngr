export const IS_CHANGE_MESSAGE = "MESSAGES_IS_CHANGE_MESSAGE";

export const isChangingMessage = (change, changeId, text) => ({
    type: IS_CHANGE_MESSAGE,
    payload: {
        // статус изменения какого-либо сообщения
        change,
        // id изменяемого сообщения
        changeId,
        // также передаем текст, чтобы потом вставить его в value в компоненте Form
        text
    }
})