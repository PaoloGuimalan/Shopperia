import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ORDERS_ADMIN, SET_ORDERS_CANCELLED, SET_ORDERS_DELIVERED, SET_ORDERS_ONDELIVERY, SET_ORDERS_PREPARING, SET_ORDERS_WAITING, SET_PRODUCTS } from '../Redux/types/types';
import { Link, useNavigate } from 'react-router-dom';
import './css/OrdersDashboard.css';

function OrdersDashboard() {

  const shopID = useSelector(state => state.sellerID.shopID);
  // const shopname = useSelector(state => state.sellerID.shopname);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLoginSeller);
  const userName = useSelector(state => state.userID);
  const dashstats = useSelector(state => state.dashboardstatus);
  const sellerID = useSelector(state => state.sellerID);
  const sellerinfo = useSelector(state => state.sellerinfo);
  const ordersadmin = useSelector(state => state.ordersadmin);
  const orderspreparing = useSelector(state => state.orderspreparing);
  const orderswaiting = useSelector(state => state.orderswaiting);
  const ordersondelivery = useSelector(state => state.ordersondelivery);
  const ordersdelivered = useSelector(state => state.ordersdelivered);
  const orderscancelled = useSelector(state => state.orderscancelled);

  const [statusifier, setstatusifier] = useState("Pending");
  const [statusremarks, setstatusremarks] = useState("Confirming Order");

  useEffect(() => {
    Axios.get(`http://localhost:3001/ordersfetch/${sellerID.shopName}/${statusifier}/${statusremarks}`, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      // dispatch({type: SET_ORDERS_ADMIN, ordersadmin: response.data});
      if(statusifier == "Pending"){
        if(statusremarks == "Confirming Order"){
          dispatch({type: SET_ORDERS_ADMIN, ordersadmin: response.data});
        }
        else if(statusremarks == "Preparing Order"){
          dispatch({type: SET_ORDERS_PREPARING, orderspreparing: response.data});
        }
        else if(statusremarks == "For Ship Out"){
          dispatch({type: SET_ORDERS_WAITING, orderswaiting: response.data});
        }
      }
      else if(statusifier == "OnDelivery"){
        dispatch({type: SET_ORDERS_ONDELIVERY, ordersondelivery: response.data});
      }
      else if(statusifier == "Received"){
        dispatch({type: SET_ORDERS_DELIVERED, ordersdelivered: response.data});
      }
      else if(statusifier == "Cancelled"){
        dispatch({type: SET_ORDERS_CANCELLED, orderscancelled: response.data});
      }
    }).catch((err) => console.log(err));
  }, [ordersadmin, statusifier, statusremarks]);

  const confOrder = (order_id ,newstatus, newremarks) => {
    // alert(`${order_id}, ${newstatus}, ${newremarks}`);
    Axios.post('http://localhost:3001/updateOrderStatus', {
      order_id: order_id, 
      status: newstatus,
      remarks: newremarks
    }, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      
    }).catch(err => console.log(err));
  }

  const conchat = (order_id_chat) => {
    Axios.get(`http://localhost:3001/conchatRider/${order_id_chat}`, {
      headers:{
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      }
    }).then((response) => {
      navigate(`/dashboard/messages/${response.data.rider_id}`);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div id='div_order'>
      <nav id='nav_order'>
        <li id='li_order_one' className='li_class_all_orders'>
          <p id='label_order'><span id='span_uno'>Orders</span> | <span id='span_sec'>Pending Orders: {shopID}</span></p>
        </li>
        <li className='li_class_all_orders'>
          <nav id='nav_buttons_orders'>
            <li>
              <button className='btns_nav_orders' onClick={() => setstatusifier("Pending")} >Pending</button>
            </li>
            <li>
              <button className='btns_nav_orders' onClick={() => setstatusifier("OnDelivery")}>On Delivery</button>
            </li>
            <li>
              <button className='btns_nav_orders' onClick={() => setstatusifier("Received")}>Delivered</button>
            </li>
            <li>
              <button className='btns_nav_orders' onClick={() => setstatusifier("Cancelled")}>Cancelled</button>
            </li>
          </nav>
        </li>
        <li id='li_label_status'>
          <p id='label_statusifier'>{statusifier == "Received"? "Delivered" : statusifier} Orders | {statusifier == "Pending"? statusremarks : ""}</p>
        </li>
        <li className='li_class_all_orders'>
          {statusifier == "Pending"? (
            <nav id='nav_buttons_orders'>
              <li>
                <button className='btns_nav_orders' onClick={() => setstatusremarks("Confirming Order")} >Unconfirmed</button>
              </li>
              <li>
                <button className='btns_nav_orders' onClick={() => setstatusremarks("Preparing Order")}>Preparing</button>
              </li>
              <li>
                <button className='btns_nav_orders' onClick={() => setstatusremarks("For Ship Out")}>Waiting</button>
              </li>
            </nav>
          ) : (
            ""
          )}
        </li>
        <li>
          <table id='table_orders'>
            <tbody>
              <tr>
                <th id='th_one'>
                  Order ID
                </th>
                <th id='th_two'>
                  Receiver | Address
                </th>
                <th id='th_three'>
                  Order Information<br />(Type, Size, Quantity, Price)
                </th>
                <th id='th_four'>
                  Date Ordered
                </th>
                <th id='th_five'>
                  Set Order
                </th>
              </tr>
                {statusifier == "Pending"? statusremarks == "Confirming Order"? ordersadmin.length != 0? (
                  ordersadmin.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                          <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status pending'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : statusremarks == "Preparing Order"? orderspreparing.length != 0? (
                  orderspreparing.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                          <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status pending'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : statusremarks == "For Ship Out"? orderswaiting.length != 0? (
                  orderswaiting.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                            <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status pending'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                        <button style={{display: items.status != "Pending"? "none" : items.remarks != "On Pick Up"? "none" : "block"}} className='btns_order' id='btn_conchat' onClick={() => {conchat(items.order_id)}}>Chat Rider</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out" || items.remarks == "On Pick Up"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : "remarks" : statusifier == "OnDelivery"? ordersondelivery.length != 0? (
                  ordersondelivery.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                          <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status ondelivery'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : statusifier == "Received"? ordersdelivered.length != 0? (
                  ordersdelivered.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                          <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status delivered'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : statusifier == "Cancelled"? orderscancelled.length != 0? (
                  orderscancelled.map((items) => {
                    return(
                      <motion.tr
                      whileHover={{
                        boxShadow: "0px 0px 5px black"
                      }} 
                      key={items.order_id} className='tr_orders'>
                        <td>
                          <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>
                          <table className='tbl_ordercontent'>
                              <tbody>
                                <tr>
                                  <td>
                                    {items.order_id}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span className='labels_status cancelled'>{items.status} - {items.remarks}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Link>
                        </td>
                        <td>
                          <b>{items.receiver}</b> <br /> {items.fulladdress}
                        </td>
                        <td>
                          {items.var_typename} | {items.var_size} | {items.variety} item/s | &#8369;{items.order_total}
                        </td>
                        <td>
                          {items.date_ordered}
                        </td>
                        <td>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks == "For Ship Out"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id ,"Pending", items.remarks == "Confirming Order"? "Preparing Order":"For Ship Out")}}>{items.remarks == "Preparing Order"? "Ready to Ship":"Confirm Order"}</button>
                          <button style={{display: items.status != "Pending"? "none" : items.remarks != "Confirming Order"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled", "Order was Cancelled")}}>Deny Order</button>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <h4 id='no_orders_label'>No Orders to show.</h4>
                ) : "status"}
            </tbody>
          </table>
        </li>
      </nav>
    </div>
  )
}

export default OrdersDashboard