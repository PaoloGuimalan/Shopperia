import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './css/Cart.css'
import { useNavigate } from 'react-router-dom';
import { SET_CART, SET_RECEIVED } from '../../Redux/types/types';

function Recieved() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);
  const cart = useSelector(state => state.received);

  useEffect(() => {
    const value = 'Received';
    Axios.get(`http://localhost:3001/cartProducts/${userName}/${value}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_RECEIVED, received: response.data});
      // console.log(cart);
    }).catch((err) => console.log(err));
  }, [userName, cart]);

  return (
    <div id='cart_div'>
      <nav id='nav_cart'>
        <li>
        {cart.length >= 1? (
            cart.map((res) => {
              return(
                <nav id='nav_list' key={res.product_id}>
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
                        <span>Status: <span id='received_text'><p className='p_tag_status'>{res.status}</p></span></span>
                      </li>
                    <li>
                      <h4 id='total_var'>Order Total: {res.order_total}</h4>
                    </li>
                  </li>
                </nav>
              )
            })
          ) : (
            <h4>No Successful Orders Yet</h4>
          )}
        </li>
      </nav>
    </div>
  )
}

export default Recieved