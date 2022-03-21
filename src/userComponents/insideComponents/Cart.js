import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import './css/Cart.css'
import { useNavigate } from 'react-router-dom';
import { SET_CART } from '../../Redux/types/types';

function Cart() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    const value = 'Cart';
    Axios.get(`http://localhost:3001/cartProducts/${userName}/${value}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_CART, cart: response.data});
      // console.log(cart);
    }).catch((err) => console.log(err));
  }, [userName, cart]);

  return (
    <div id='cart_div'>
      <nav id='nav_cart'>
        <li>
        {cart.length == 1? (
            cart.map((res) => {
              return(
                <nav id='nav_list' key={res.product_id}>
                  <li>
                    <h4>{res.order_id} | {res.product_id}</h4>
                  </li>
                  <li>
                    <span>Quantity: {res.variety}</span>
                  </li>
                  <li>
                    <span>Status: {res.status}</span>
                  </li>
                  <li>
                    <h4>Order Total: {res.order_total}</h4>
                  </li>
                </nav>
              )
            })
          ) : (
            <h4>No Items on your Cart</h4>
          )}
        </li>
      </nav>
    </div>
  )
}

export default Cart