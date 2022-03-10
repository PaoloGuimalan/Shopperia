import React, { useState, useEffect } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './css/Home.css';
import HomeLogo from './imgs/home_logo.png';
import SearchIcon from '@material-ui/icons/Search';
import MenuDown from '@material-ui/icons/KeyboardArrowDown';
import MenuUp from '@material-ui/icons/KeyboardArrowUp';
import Notifs from '@material-ui/icons/NotificationsOutlined';
import CartIcon from '@material-ui/icons/ShoppingCartOutlined';
import MessagesIcon from '@material-ui/icons/MessageOutlined';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { SET_PRODUCTS } from '../Redux/types/types';

function Home() {

  const userName = useSelector(state => state.userID);
  const redirector = useSelector(state => state.statusLogin);
  const dispatch = useDispatch();

  const [menu, setmenu] = useState(false);

  const proDs = useSelector(state => state.products);

  useEffect(() => {
    Axios.get('http://localhost:3001/getProducts').then((response) => {
      dispatch({type: SET_PRODUCTS, products: response.data});
    }).catch((err) => {
      console.log(err);
    })
  }, [proDs]);

  return (
    <div id='home_div'>
        <div id='navigation_div'>
          <nav id='navbar'>
            <li className='li_home'>
              <Link to='/home' ><img src={HomeLogo} id='home_logo' /></Link>
            </li>
            <li className='li_home searchbar'>
              <div id='div_search_form'>
                <input type='text' name='search' id='search'/>
                <button id='btn_search'><SearchIcon /></button>
              </div>
            </li>
            <li className='li_home'>
              <button className='navs' title='Menu' onClick={() => setmenu(!menu)}>{menu? <MenuUp /> : <MenuDown />}</button>
              {/* <div id='menu_dropdown'>Hellokasjdhkashdkjahsdkj</div> */}
            </li>
            <li>
              <Link to='/messages'><button className='navs hidder'><MessagesIcon /></button></Link>
            </li>
            <li>
              <Link to='/notifications'><button className='navs hidder'><Notifs /></button></Link>
            </li>
            <li>
              <Link to='/pocket/cart'><button className='navs hidder'><CartIcon /></button></Link>
            </li>
            <li>
              <Link to='/profile'><button className='navs hidder'>{redirector? userName : ("Login | Sign up")}</button></Link>
            </li>
          </nav>
        </div>
        <motion.div
        animate={{
          height: menu? "auto" : "0px"
        }} 
        id='menu_dropdown'>
          <motion.ul
      transition={{
        delay: 0
      }}
      id='ul_main'>
            <li>
              <ul className='menu_item_ul'>
                <li>
                  <p><b>Products</b></p>
                  <ul className='links_list'>
                    <li>
                      <Link to='/home/categories' className='links'><p>Categories</p></Link>
                    </li>
                    <li>
                      <Link to='/home/brands' className='links'><p>Brands</p></Link>
                    </li>
                    <li>
                      <Link to='/home/shops' className='links'><p>Shops</p></Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <ul className='menu_item_ul'>
                <li>
                  <p><b>My Pocket</b></p>
                  <ul className='links_list'>
                    <li>
                      <Link to='/pocket/cart' className='links'><p>Cart</p></Link>
                    </li>
                    <li>
                      <Link to='/pocket/pending' className='links'><p>Pending</p></Link>
                    </li>
                    <li>
                      <Link to='/pocket/onDelivery' className='links'><p>On Delivery</p></Link>
                    </li>
                    <li>
                      <Link to='/pocket/received' className='links'><p>Received</p></Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <ul className='menu_item_ul'>
                <li>
                  <p><b>Account</b></p>
                  <ul className='links_list'>
                    <li>
                      <Link to='/profile' className='links'><p>Profile</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/contactdetails' className='links'><p>Contact Details</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/addresses' className='links'><p>Saved Adresses</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/settings' className='links'><p>Settings</p></Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </motion.ul>
        </motion.div>
    </div>
  )
}

export default Home