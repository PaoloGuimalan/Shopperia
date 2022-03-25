import { SET_ORDERS_ADMIN } from "../types/types";

export const setordersadmin = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_ADMIN:
            return action.ordersadmin;
        default:
            return state;
    }
}