import { SET_ORDERS_ADMIN, SET_ORDERS_CANCELLED, SET_ORDERS_DELIVERED, SET_ORDERS_ONDELIVERY, SET_ORDERS_PREPARING, SET_ORDERS_WAITING } from "../types/types";

export const setordersadmin = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_ADMIN:
            return action.ordersadmin;
        default:
            return state;
    }
}

export const setorderspreparing = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_PREPARING:
            return action.orderspreparing;
        default:
            return state;
    }
}

export const setorderswaiting = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_WAITING:
            return action.orderswaiting;
        default:
            return state;
    }
}

export const setordersondelivery = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_ONDELIVERY:
            return action.ordersondelivery;
        default:
            return state;
    }
}

export const setordersdelivered = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_DELIVERED:
            return action.ordersdelivered;
        default:
            return state;
    }
}

export const setorderscancelled = (state = [], action) => {
    switch(action.type){
        case SET_ORDERS_CANCELLED:
            return action.orderscancelled;
        default:
            return state;
    }
}