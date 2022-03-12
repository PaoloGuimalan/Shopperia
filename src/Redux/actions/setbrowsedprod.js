import { SET_BROWSED_PROD } from "../types/types";

export const setbrowsedprod = (state = [], action) => {
    switch(action.type){
        case SET_BROWSED_PROD:
            return action.browsedprod;
        default:
            return state;
    }
}