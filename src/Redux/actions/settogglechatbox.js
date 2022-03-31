import { TOGGLE_CHAT_BOX } from "../types/types";

export const settogglechatbox = (state = {open: false, user: "", conversation_id: ""}, action) => {
    switch(action.type){
        case TOGGLE_CHAT_BOX:
            return action.status;
        default:
            return state;
    }
}