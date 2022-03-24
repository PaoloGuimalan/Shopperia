import { SET_ON_DELIVERY } from "../types/types";

export const setondelivery = (state = [], action) => {
    switch(action.type){
        case SET_ON_DELIVERY:
            return action.ondelivery;
        default:
            return state;
    }
}