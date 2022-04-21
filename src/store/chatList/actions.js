export const DELETED = "CHATLIST_DELETED";

// флаг для редиректа при удалении чата
export const deleted = (newDeleted) => ({
    type: DELETED,
    payload: {
        deleted: newDeleted
    }
});