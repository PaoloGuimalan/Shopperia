import { SET_PRBR_SHOP, SET_SHOP_PR, SHOP_PREVIEW } from "../types/types";

export const setshoppreview = (state = {shop_preview: "", shopName: "", shopID: "", shopEmail: "",  shopAddress: "", shopRating: 0, contactNumber: ""}, action) => {
    switch(action.type){
        case SHOP_PREVIEW:
            return action.shoppreview;
        default:
            return state;
    }
}

export const setshopprbr = (state = {result: [], result2: []}, action) => {
    switch(action.type){
        case SET_PRBR_SHOP:
            return action.prbrshop;
        default:
            return state;
    }
}

export const setshopproducts = (state = [], action) => {
    switch(action.type){
        case SET_SHOP_PR:
            return action.shoppr;
        default:
            return state;
    }
}