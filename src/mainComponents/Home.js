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
import { SET_ID, SET_LOGIN, SET_PRODUCTS, SET_SEARCH, TOGGLE_CHAT_BOX } from '../Redux/types/types';
import Messages from '../userComponents/Messages';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CloseIcon from '@material-ui/icons/Close';
import Banner1 from './imgs/banners/banner1.jpg';
import Banner2 from './imgs/banners/banner2.jpg';
import Banner3 from './imgs/banners/banner3.jpg';
import Banner4 from './imgs/banners/banner4.jpg';

function Home() {

  const userName = useSelector(state => state.userID);
  const redirector = useSelector(state => state.statusLogin);
  const searchvalue = useSelector(state => state.searchvalue);
  const statuschatbox = useSelector(state => state.chatboxstatus);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [menu, setmenu] = useState(false);
  const [messagespanel, setmessagespanel] = useState(false);
  // const [searchvalue, setsearchvalue] = useState("");

  const proDs = useSelector(state => state.products);

  useEffect(() => {
    Axios.get('http://localhost:3001/getProducts').then((response) => {
      dispatch({type: SET_PRODUCTS, products: response.data});
      // console.log(redirector);
    }).catch((err) => {
      console.log(err);
    })
  }, [proDs]);

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
        // navigate("/login");
      }
    })
  }, [redirector, userName]);

  const searchbtnTrigger = () => {
      // alert(searchvalue);
      const searchUrl = searchvalue.split(" ").join("_")
      navigate(`/search/${searchUrl}`);
  }

  return (
    <div id='home_div'>
        <div id='navigation_div'>
          <nav id='navbar'>
            <li className='li_home'>
              <Link to='/home' ><img src={HomeLogo} id='home_logo' /></Link>
            </li>
            <li className='li_home searchbar'>
              <div id='div_search_form'>
                <input type='text' name='search' id='search' value={searchvalue} onChange={(e) => {dispatch({type: SET_SEARCH, searchstate: e.target.value})}} placeholder='Search for a Product Name, Code, Category and Brands' />
                <button id='btn_search' onClick={searchbtnTrigger} disabled={searchvalue == ""? true : false}><SearchIcon /></button>
              </div>
            </li>
            <li className='li_home'>
              <button className='navs' title='Menu' onClick={() => setmenu(!menu)}>{menu? <MenuUp /> : <MenuDown />}</button>
              {/* <div id='menu_dropdown'>Hellokasjdhkashdkjahsdkj</div> */}
            </li>
            <li>
              <button className='navs hidder' onClick={() => setmessagespanel(!messagespanel)}><MessagesIcon /></button>
            </li>
            <li>
              <Link to='/notifications'><button className='navs hidder'><Notifs /></button></Link>
            </li>
            <li>
              <Link to='/profile/pocket/cart'><button className='navs hidder'><CartIcon /></button></Link>
            </li>
            <li>
              <Link to='/profile'><button className='navs hidder'>{redirector? userName : ("Login | Sign up")}</button></Link>
            </li>
          </nav>
        </div>
        <motion.div id='messages_panel'
        animate={{
          height: messagespanel? "auto" : "0px"
        }}
        >
          <Messages />
        </motion.div>
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
                  <p><b>My Orders</b></p>
                  <ul className='links_list'>
                    <li>
                      <Link to='/profile/pocket/cart' className='links'><p>Cart</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/pocket/pending' className='links'><p>Pending</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/pocket/onDelivery' className='links'><p>On Delivery</p></Link>
                    </li>
                    <li>
                      <Link to='/profile/pocket/received' className='links'><p>Received</p></Link>
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
        <div>
          <div id='carousel_div'>
            <Carousel width="100%" autoPlay={true} infiniteLoop={true} interval={2000} showThumbs={false} showStatus={false}>
              <div>
                <img src={Banner1} />
              </div>
              <div>
                <img src={Banner2} />
              </div>
              <div>
                <img src={Banner3} />
              </div>
              <div>
                <img src={Banner4} />
              </div>
            </Carousel>
          </div>
        </div>
    </div>
  )
}

export default Home