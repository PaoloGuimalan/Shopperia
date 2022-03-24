import { SET_SHOP_RESULT } from "../types/types";

export const setshopresult = (state = [], action) => {
    switch(action.type){
        case SET_SHOP_RESULT:
            return action.shopresult;
        default:
            return state;
    }
}