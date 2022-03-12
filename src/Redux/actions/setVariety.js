import { SET_VARIETY } from "../types/types";

export const setvariety = (state = [], action) => {
    switch(action.type){
        case SET_VARIETY:
            return action.varieties;
        default:
            return state;
    }
}