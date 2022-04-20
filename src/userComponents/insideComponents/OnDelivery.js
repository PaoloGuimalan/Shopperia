import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './css/Cart.css'
import { useNavigate } from 'react-router-dom';
import { SET_CART, SET_ON_DELIVERY, TOGGLE_CHAT_BOX } from '../../Redux/types/types';

function OnDelivery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);
  const cart = useSelector(state => state.ondelivery);

  useEffect(() => {
    const value = 'OnDelivery';
    Axios.get(`http://localhost:3001/cartProducts/${userName}/${value}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_ON_DELIVERY, ondelivery: response.data});
      // console.log(cart);
    }).catch((err) => console.log(err));
  }, [userName, cart]);

  const chatBox = (open, user) => {
    Axios.get(`http://localhost:3001/getRiderInfo/${user}`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: response.data.rider_id}});
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div id='cart_div'>
      <nav id='nav_cart'>
        <li>
        {cart.length >= 1? (
            cart.map((res) => {
              return(
                <nav id='nav_list' key={res.order_id}>
                  <li>
                    <img src={res.var_img} className='pr_var_prev'/>
                  </li>
                  <li id='li_main_last'>
                    <li>
                      <h4 id='name_var'>{res.order_id} | {res.product_id}</h4>
                      <span id='span_var'>{res.shopname}</span>
                    </li>
                    <li>
                      <span>Quantity: {res.variety}</span>
                    </li>
                    <li>
                        <span><span id='ondelivery_text'><p className='p_tag_status'>{res.status}: {res.remarks}</p></span></span>
                      </li>
                    <li>
                      <h4 id='total_var'>Order Total: {res.order_total}</h4>
                    </li>
                    <li className='btn_handler_confirm'>
                      <button className='btn_confirm_from_ond'>View Order</button>
                      <button className='btn_confirm_from_ond' onClick={() => chatBox(true, res.order_id)}>Chat Rider</button>
                    </li>
                  </li>
                </nav>
              )
            })
          ) : (
            <h4 className='label_no_result'>No Items to Receive</h4>
          )}
        </li>
      </nav>
    </div>
  )
}

export default OnDelivery