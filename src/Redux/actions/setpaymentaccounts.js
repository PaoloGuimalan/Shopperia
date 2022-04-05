import { GET_PAYMENT_ACCOUNTS } from "../types/types";

export const setpaymentaccounts = (state = [], action) => {
    switch(action.type){
        case GET_PAYMENT_ACCOUNTS:
            return action.paymentaccounts;
        default:
            return state;
    }
}