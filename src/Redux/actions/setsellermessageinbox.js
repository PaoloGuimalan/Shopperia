import { SELLER_MESSAGE_INBOX } from "../types/types";

export const setsellermessageinbox = (state = [], action) => {
    switch(action.type){
        case SELLER_MESSAGE_INBOX:
            return action.sellermessageInbox;
        default:
            return state;
    }
}