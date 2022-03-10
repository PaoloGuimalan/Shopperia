import { SET_LOGIN_SELLER } from "../types/types";

export const setLoginSeller = (state = false, action) => {
    switch (action.type) {
        case SET_LOGIN_SELLER:
            return action.loginstatusseller;
        default:
            return state;
    }
}