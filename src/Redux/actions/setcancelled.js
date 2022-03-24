import { SET_CANCELLED } from "../types/types";

export const setcancelled = (state = [], action) => {
    switch(action.type){
        case SET_CANCELLED:
            return action.cancelled;
        default:
            return state;
    }
}