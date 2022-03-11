import { SET_SEARCH } from "../types/types";

export const setsearchvalue = (state = "", action) => {
    switch(action.type){
        case SET_SEARCH:
            return action.searchstate;
        default:
            return state;
    }
}