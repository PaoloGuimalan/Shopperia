import { SET_ADDRESSES } from "../types/types";

export const setaddresses = (state = [], action) => {
    switch(action.type){
        case SET_ADDRESSES:
            return action.addresses;
        default:
            return state;
    }
}