import { SET_SHOP_ADDRESS } from "../types/types";

export const setshopaddress = (state = "", action) => {
    switch(action.type){
        case SET_SHOP_ADDRESS:
            return action.shopaddress;
        default:
            return state;
    }
}