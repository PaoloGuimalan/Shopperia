import { SET_RECEIVED } from "../types/types";

export const setreceived = (state = [], action) => {
    switch(action.type){
        case SET_RECEIVED:
            return action.received;
        default:
            return state;
    }
}