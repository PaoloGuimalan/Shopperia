import { SET_CART } from "../types/types";

export const setcart = (state = [], action) => {
    switch(action.type){
        case SET_CART:
            return action.cart;
        default:
            return state;
    }
}