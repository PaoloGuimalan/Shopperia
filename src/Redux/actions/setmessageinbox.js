import { USER_MESSAGE_INBOX } from "../types/types";

export const setmessageinbox = (state = [], action) => {
    switch(action.type){
        case USER_MESSAGE_INBOX:
            return action.messageInbox;
        default:
            return state;
    }
}