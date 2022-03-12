import { SET_PRODRESULTS } from "../types/types";

export const setprodsresultsstate = (state = [], action) => {
    switch(action.type){
        case SET_PRODRESULTS:
            return action.prodsresults;
        default:
            return state;
    }
}