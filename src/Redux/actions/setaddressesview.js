import { SET_ADDRESSES_VIEW } from "../types/types";

export const setaddressesview = (state =[], action) => {
    switch(action.type){
        case SET_ADDRESSES_VIEW:
            return action.addressView;
        default:
            return state;
    }
}