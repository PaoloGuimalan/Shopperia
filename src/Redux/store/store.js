import { createStore, combineReducers } from "redux";
import { setLogin } from "../actions/setLogin";
import { setID } from "../actions/setID";
import { setsellerID } from "../actions/setsellerID";
import { setLoginSeller } from "../actions/setLoginSeller";
import { sellerdashboard } from "../actions/sellerdashboard";
import { setProducts } from "../actions/setProducts";

const combiner = combineReducers({
    statusLogin: setLogin,
    statusLoginSeller: setLoginSeller,
    userID: setID,
    sellerID: setsellerID,
    dashboardstatus: sellerdashboard,
    products: setProducts
})

const store = createStore(combiner);

export default store;