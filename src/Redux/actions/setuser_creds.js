import { SET_SAVED_CONTACTS, SET_USER_CREDS } from "../types/types";

export const setUserCreds = (state = [], action) => {
    switch(action.type){
        case SET_USER_CREDS:
            return action.user_creds;
        default:
            return state;
    }
}

export const setsavedcontacts = (state = [], action) => {
    switch(action.type){
        case SET_SAVED_CONTACTS:
            return action.savedcontacts;
        default:
            return state;
    }
}