import { SET_LOGIN } from "../types/types";

export const setLogin = (state = false, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return action.loginstatus;
        default:
            return state;
    }
}