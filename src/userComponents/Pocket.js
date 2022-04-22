import React, {useState, useEffect} from 'react'
import { useNavigate, Route, Link, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { SET_LOGIN, SET_ID } from '../Redux/types/types.js';
import Cart from './insideComponents/Cart.js';
import Pending from './insideComponents/Pending.js';
import OnDelivery from './insideComponents/OnDelivery.js';
import Recieved from './insideComponents/Recieved.js';
import Cancelled from './insideComponents/Cancelled.js';
import './css/Pocket.css';
import ViewOrder from './insideComponents/ViewOrder.js';

function Pocket() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirector = useSelector(state => state.statusLogin);
    const userName = useSelector(state => state.userID);
    const user_creds = useSelector(state => state.user_creds);
  
    useEffect(() => {
      Axios.get("http://localhost:3001/loginsession", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        // console.log(response.data);
        if(response.data.status){
          dispatch({type: SET_LOGIN, loginstatus: response.data.status});
          dispatch({type: SET_ID, userID: response.data.userName});
          // navigate("/profile");
        }
        else{
          dispatch({type: SET_LOGIN, loginstatus: response.data.status});
          navigate("/login");
        }
      })
    }, [redirector, userName]);

  return (
    <div id='pocket_div'>
        <nav id='nav_pocket'>
            <li id='li_nav_one'>
                <h3 id='label_pocket'>My Orders</h3>
            </li>
            <li id='li_nav_two'>
                <nav id='nav_btns_pocket'>
                    <li>
                        <Link to='/profile/pocket/cart'><button id='btn_cart' className='btns_pocket_nav'>Cart</button></Link>
                    </li>
                    <li>
                        <Link to='/profile/pocket/pending'><button id='btn_pending' className='btns_pocket_nav'>Pending</button></Link>
                    </li>
                    <li>
                        <Link to='/profile/pocket/onDelivery'><button id='btn_ondelivery' className='btns_pocket_nav'>On Delivery</button></Link>
                    </li>
                    <li>
                        <Link to='/profile/pocket/received'><button id='btn_received' className='btns_pocket_nav'>Received</button></Link>
                    </li>
                    <li>
                        <Link to='/profile/pocket/cancelled'><button id='btn_cancelled' className='btns_pocket_nav'>Cancelled</button></Link>
                    </li>
                </nav>
            </li>
        </nav>
        <Routes>
            <Route path='/cart' element={<Cart />} />
            <Route path='/pending' element={<Pending />} />
            <Route path='/onDelivery' element={<OnDelivery />} />
            <Route path='/received' element={<Recieved />} />
            <Route path='/cancelled' element={<Cancelled />} />
            <Route path='/viewOrder/:order_id' element={<ViewOrder />} />
        </Routes>
    </div>
  )
}

export default Pocket