export const CHANGE_NAME = "PROFILE_CHANGE_NAME";
export const SIGN_IN = "PROFILE_SIGN_IN";
export const SIGN_OUT = "PROFILE_SIGN_OUT";


// сделала сразу в редакс, т.к. мы вытаскиваем имя пользователя в MessageList для отображения актуального имени в случае его изменения (упростила себе задачу)
export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload:
    {
        name: newName,
    }
});

// signIn и signOut используются в компоненте Routes
export const signIn = () => ({
    type: SIGN_IN,
});

export const signOut = () => ({
    type: SIGN_OUT,
});