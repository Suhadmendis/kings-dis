const INITIAL_STATE = {
    loggedIn: false,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, loggedIn: true, token: action.payload.token };
        case 'SIGN_OUT':
            return { ...state, loggedIn: false, token: null };
        default:
            return state;
    }
};
