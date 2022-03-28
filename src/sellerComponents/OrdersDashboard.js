import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ORDERS_ADMIN, SET_PRODUCTS } from '../Redux/types/types';
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

  const [statusifier, setstatusifier] = useState("Pending");

  useEffect(() => {
    Axios.get(`http://localhost:3001/ordersfetch/${sellerID.shopName}/${statusifier}`, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      dispatch({type: SET_ORDERS_ADMIN, ordersadmin: response.data});
    }).catch((err) => console.log(err));
  }, [ordersadmin, statusifier]);

  const confOrder = (order_id ,newstatus) => {
    Axios.post('http://localhost:3001/updateOrderStatus', {
      order_id: order_id, 
      status: newstatus
    }, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {

    }).catch(err => console.log(err));
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
          <p id='label_statusifier'>{statusifier == "Received"? "Delivered" : statusifier} Orders</p>
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
                {ordersadmin.map((items) => {
                  return(
                    <motion.tr
                    whileHover={{
                      boxShadow: "0px 0px 5px black"
                    }} 
                    key={items.order_id} className='tr_orders'>
                      <td>
                        <Link to={`/dashboard/orders/${items.order_id}`} className='link_orders'>{items.order_id}</Link>
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
                        <button style={{display: items.status == "Cancelled" || items.status == "Received"? "none" : "block"}} className='btns_order' id='btn_conf' onClick={() => {confOrder(items.order_id , items.status == "OnDelivery"? "Received":"OnDelivery")}}>{items.status == "OnDelivery"? "Mark as Delivered":"Confirm Order"}</button>
                        <button style={{display: items.status != "Pending"? "none" : "block"}} className='btns_order' id='btn_can' onClick={() => {confOrder(items.order_id, "Cancelled")}}>Deny Order</button>
                      </td>
                    </motion.tr>
                  )
                })}
            </tbody>
          </table>
        </li>
      </nav>
    </div>
  )
}

export default OrdersDashboard