import { SHOP_PREVIEW } from "../types/types";

export const setshoppreview = (state = {shop_preview: "", shopName: "", shopID: "", shopEmail: ""}, action) => {
    switch(action.type){
        case SHOP_PREVIEW:
            return action.shoppreview;
        default:
            return state;
    }
}