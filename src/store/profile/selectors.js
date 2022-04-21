// два способа создания селекторов
export function getProfileName(state) {
    return state.profile.name;
}

export const selectAuth = (state) => state.profile.authed;