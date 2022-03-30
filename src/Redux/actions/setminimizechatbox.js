import { MINIMIZE_CHAT_BOX } from "../types/types";

export const setminimizechatbox = (state = false, action) => {
    switch(action.type){
        case MINIMIZE_CHAT_BOX:
            return action.minimizestate;
        default:
            return state;
    }
}