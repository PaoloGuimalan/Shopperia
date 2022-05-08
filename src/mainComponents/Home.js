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
import { SET_HOMEPROD_VIEW, SET_HOMESHOP_VIEW, SET_ID, SET_LOGIN, SET_PRODUCTS, SET_SEARCH, TOGGLE_CHAT_BOX } from '../Redux/types/types';
import Messages from '../userComponents/Messages';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CloseIcon from '@material-ui/icons/Close';
import Banner1 from './imgs/banners/banner1.jpg';
import Banner2 from './imgs/banners/banner2.jpg';
import Banner3 from './imgs/banners/banner3.jpg';
import Banner4 from './imgs/banners/banner4.jpg';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import UnselStarIcon from '@material-ui/icons/Star';

function Home() {

  const userName = useSelector(state => state.userID);
  const redirector = useSelector(state => state.statusLogin);
  const searchvalue = useSelector(state => state.searchvalue);
  const statuschatbox = useSelector(state => state.chatboxstatus);
  const homeshopview = useSelector(state => state.homeshopview);
  const homeprodview = useSelector(state => state.homeprodview);
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

  useEffect(() => {
    Axios.get('http://localhost:3001/homeshopview').then((response) => {
      dispatch({type: SET_HOMESHOP_VIEW, homeshopview: response.data});
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    Axios.get('http://localhost:3001/homeproductsview').then((response) => {
      dispatch({type: SET_HOMEPROD_VIEW, homeprodview: response.data});
    }).catch((err) => {
      console.log(err);
    })
  }, [])

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
          <div id='div_suggested_stores'>
              <h3>Suggested Stores</h3>
              <ul id='ul_products_results'>
                  {homeshopview.map((shop) => {
                    return(
                      <Link to={`/shopview/${shop.shopID}`} className='link_products'>
                        <li>
                          <div className='div_shop'>
                            <motion.img
                            whileHover={{
                              rotate: 360,
                              scale: 1.1
                            }} 
                            transition={{
                              duration: 0.3
                            }}
                            src={shop.shop_preview} className='img_shop'/>
                            <p id='tag_shopname'>{shop.shopName}</p>
                          </div>
                        </li>
                      </Link>
                    )
                  })}
              </ul>
          </div>
          <div id='div_suggested_products'>
            <h3>Suggested Products</h3>
            <ul id='ul_products_results'>
              {homeprodview.map((items) => {
                  return(
                  <Link className='link_products' key={items.product_id} to={`/productsView/${items.product_id}`} >
                    <motion.li
                    className='under_li_res' key={items.product_id}>
                      <nav
                      className='nav_products'>
                        <li>
                          <img src={items.base_preview} className='imgs_handler' alt={items.product_id}/>
                        </li>
                        <li className='above_li'>
                          <p><b>{items.prname} | {items.prbrand}</b></p>
                        </li>
                        <li className='above_li'>
                          <p id='display_stars'><b>{items.overall? Math.round(items.overall * 10) / 10 : 0}</b>
                            {items.overall >= 1? <UnselStarIcon style={{fontSize: "16px", color: "yellow"}} /> : <StarIcon style={{fontSize: "16px", color: "yellow"}} />}
                            {items.overall >= 2? <UnselStarIcon style={{fontSize: "16px", color: "yellow"}} /> : <StarIcon style={{fontSize: "16px", color: "yellow"}} />}
                            {items.overall >= 3? <UnselStarIcon style={{fontSize: "16px", color: "yellow"}} /> : <StarIcon style={{fontSize: "16px", color: "yellow"}} />}
                            {items.overall >= 4? <UnselStarIcon style={{fontSize: "16px", color: "yellow"}} /> : <StarIcon style={{fontSize: "16px", color: "yellow"}} />}
                            {items.overall >= 5? <UnselStarIcon style={{fontSize: "16px", color: "yellow"}} /> : <StarIcon style={{fontSize: "16px", color: "yellow"}} />}
                          </p>
                        </li>
                        <li className='above_li'>
                          <p><b>&#8369;{items.minPrice} - &#8369;{items.maxPrice}</b></p>
                        </li>
                        <li className='above_li'>
                          <p><b>{items.shopname}</b></p>
                        </li>
                        <li className='above_li'>
                          <p>{items.prcat}</p>
                        </li>
                      </nav>
                    </motion.li>
                  </Link>
                  )
                })}
            </ul>
          </div>
        </div>
        <footer>
          <p>Hello</p>
        </footer>
    </div>
  )
}

export default Home