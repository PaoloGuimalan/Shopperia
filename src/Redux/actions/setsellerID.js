import { SET_ID_SELLER } from "../types/types";

export const setsellerID = (state = {}, action) => {
    switch(action.type){
        case SET_ID_SELLER:
            return action.sellerID;
        default:
            return state;
    }
}