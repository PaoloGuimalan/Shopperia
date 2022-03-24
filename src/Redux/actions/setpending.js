import { SET_PENDING } from "../types/types";

export const setpending = (state = [], action) => {
    switch(action.type){
        case SET_PENDING:
            return action.pending;
        default:
            return state;
    }
}