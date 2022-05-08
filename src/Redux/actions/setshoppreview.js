import { SET_COMMENTS_PRODUCT, SET_HOMEPROD_VIEW, SET_HOMESHOP_VIEW, SET_PRBR_SHOP, SET_PRODUCT_DETAILS_ADMIN, SET_SHOP_PR, SHOP_PREVIEW } from "../types/types";

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

const productState = {
    product: {
        id_products: "",
        prname: "",
        prdesc: "",
        prcat: "",
        prbrand: "",
        base_preview: 'http://localhost:3001/productsImages/TPShirt_4434752.png',
        product_id: "",
        date_posted: "",
        shopname: "",
        shopID: "",
        rate: 0
    }, 
    variety: [], 
    comments: []
}

export const setproductdetailsadmin = (state = productState, action) => {
    switch(action.type){
        case SET_PRODUCT_DETAILS_ADMIN:
            return action.productdetailsadmin;
        default:
            return state;
    }
}

export const setcommentsproduct = (state = [], action) => {
    switch(action.type){
        case SET_COMMENTS_PRODUCT:
            return action.commentsproduct;
        default:
            return state;
    }
}

export const sethomeshopview = (state = [], action) => {
    switch(action.type){
        case SET_HOMESHOP_VIEW:
            return action.homeshopview;
        default:
            return state;
    }
}

export const sethomeprodview = (state = [], action) => {
    switch(action.type){
        case SET_HOMEPROD_VIEW:
            return action.homeprodview;
        default:
            return state;
    }
}