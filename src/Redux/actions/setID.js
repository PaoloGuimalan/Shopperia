import { SET_ID } from "../types/types";

export const setID = (state = "", action) => {
    switch(action.type){
        case SET_ID:
            return action.userID;
        default:
            return state;
    }
}