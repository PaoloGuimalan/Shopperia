import { createStore, combineReducers } from "redux";
import { setLogin } from "../actions/setLogin";
import { setID } from "../actions/setID";
import { setsellerID } from "../actions/setsellerID";
import { setLoginSeller } from "../actions/setLoginSeller";
import { sellerdashboard } from "../actions/sellerdashboard";
import { setProducts } from "../actions/setProducts";
import { setsearchvalue } from "../actions/setsearch";
import { setprodsresultsstate } from "../actions/setprodresults";
import { setbrowsedprod } from "../actions/setbrowsedprod";
import { setvariety } from "../actions/setVariety";
import { setcomments } from "../actions/setComments";
import { setUserCreds } from "../actions/setuser_creds";
import { setaddresses } from "../actions/setaddresses";
import { setaddressesview } from "../actions/setaddressesview";
import { setcart } from "../actions/setcart";
import { setpending } from "../actions/setpending";
import { setondelivery } from "../actions/setondelivery";
import { setreceived } from "../actions/setreceived";
import { setcancelled } from "../actions/setcancelled";
import { setshopresult } from "../actions/setshopresults";
import { setsellerinfo } from "../actions/setsellerinfo";
import { setordersadmin } from "../actions/setordersadmin";
import { settogglechatbox } from "../actions/settogglechatbox";
import { setminimizechatbox } from "../actions/setminimizechatbox";
import { setshoppreview } from "../actions/setshoppreview";
import { setmessagelist } from "../actions/setmessagelist";
import { setmessageinbox } from "../actions/setmessageinbox";

const combiner = combineReducers({
    statusLogin: setLogin,
    statusLoginSeller: setLoginSeller,
    userID: setID,
    sellerID: setsellerID,
    dashboardstatus: sellerdashboard,
    products: setProducts,
    searchvalue: setsearchvalue,
    resultsprods: setprodsresultsstate,
    browsedprod: setbrowsedprod,
    prodvarieties: setvariety,
    commentsProd: setcomments,
    user_creds: setUserCreds,
    addresses: setaddresses,
    addressView: setaddressesview,
    cart: setcart,
    pending: setpending,
    ondelivery: setondelivery,
    received: setreceived,
    cancelled: setcancelled,
    shopresult: setshopresult,
    sellerinfo: setsellerinfo,
    ordersadmin: setordersadmin,
    chatboxstatus: settogglechatbox,
    minimizestate: setminimizechatbox,
    shoppreview: setshoppreview,
    messagelist: setmessagelist,
    messageInbox: setmessageinbox
})

const store = createStore(combiner);

export default store;