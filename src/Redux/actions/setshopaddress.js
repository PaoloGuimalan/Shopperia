import { SET_SHOP_ADDRESS, SET_SHOP_NUMBER, SET_VERTWO_STATUS } from "../types/types";

export const setshopaddress = (state = "", action) => {
    switch(action.type){
        case SET_SHOP_ADDRESS:
            return action.shopaddress;
        default:
            return state;
    }
}

export const setshopcontactnumber = (state = {contactNumber: ""}, action) => {
    switch(action.type){
        case SET_SHOP_NUMBER:
            return action.shopnumber;
        default:
            return state;
    }
}

export const setvertwostatus = (state = [], action) => {
    switch(action.type){
        case SET_VERTWO_STATUS:
            return action.vertwostatus;
        default:
            return state;
    }
}