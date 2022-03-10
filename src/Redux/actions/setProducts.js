import { SET_PRODUCTS } from "../types/types";

export const setProducts = (state = [], action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}