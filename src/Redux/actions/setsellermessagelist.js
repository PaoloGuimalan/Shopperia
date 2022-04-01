import { SELLER_MESSAGE_LIST } from "../types/types";

export const setsellermessagelist = (state = [], action) => {
    switch(action.type){
        case SELLER_MESSAGE_LIST:
            return action.sellermessagelist;
        default:
            return state;
    }
}