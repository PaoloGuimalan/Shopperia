import { SET_SELLER_INFO } from "../types/types";

export const setsellerinfo = (state =[], action) => {
    switch(action.type){
        case SET_SELLER_INFO:
            return action.sellerinfo;
        default:
            return state;
    }
}