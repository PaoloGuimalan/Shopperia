import { SET_DASHBOARD } from "../types/types";

export const sellerdashboard = (state = true, action) => {
    switch(action.type){
        case SET_DASHBOARD:
            return action.dashboardstatus
        default:
            return state;
    }
}