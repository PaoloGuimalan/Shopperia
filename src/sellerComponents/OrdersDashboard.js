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
              <button className='btns_nav_orders' onClick={() => setstatusifier("Received")}>Received</button>
            </li>
            <li>
              <button className='btns_nav_orders' onClick={() => setstatusifier("Cancelled")}>Cancelled</button>
            </li>
          </nav>
        </li>
        <li id='li_label_status'>
          <p id='label_statusifier'>{statusifier} Orders</p>
        </li>
        <li>
          {ordersadmin.map((items) => {
            return(
              <div>
                <p>{items.user_id} | {items.product_id} | {items.status}</p>
              </div>
            )
          })}
        </li>
      </nav>
    </div>
  )
}

export default OrdersDashboard