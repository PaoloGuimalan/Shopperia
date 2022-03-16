import { SET_COMMENTS } from "../types/types";

export const setcomments = (state = [], action) => {
    switch(action.type){
        case SET_COMMENTS:
            return action.commentsState;
        default:
            return state;
    }
}