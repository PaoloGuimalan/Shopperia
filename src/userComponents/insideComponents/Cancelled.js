import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './css/Cart.css'
import { useNavigate } from 'react-router-dom';
import { SET_CANCELLED, SET_CART } from '../../Redux/types/types';

function Cancelled() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);
  const cart = useSelector(state => state.cancelled);

  useEffect(() => {
    const value = 'Cancelled';
    Axios.get(`http://localhost:3001/cartProducts/${userName}/${value}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_CANCELLED, cancelled: response.data});
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
                        <span><span id='cancelled_text'><p className='p_tag_status'>{res.status}</p></span></span>
                      </li>
                    <li>
                      <h4 id='total_var'>Order Total: {res.order_total}</h4>
                    </li>
                  </li>
                </nav>
              )
            })
          ) : (
            <h4 className='label_no_result'>No Cancelled Orders</h4>
          )}
        </li>
      </nav>
    </div>
  )
}

export default Cancelled