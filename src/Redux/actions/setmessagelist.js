import { USER_MESSAGE_LIST } from "../types/types";

export const setmessagelist = (state = [], action) => {
    switch(action.type){
        case USER_MESSAGE_LIST:
            return action.messagelist;
        default:
            return state;
    }
}