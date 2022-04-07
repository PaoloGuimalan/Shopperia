import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { SET_DASHBOARD, SET_ID_SELLER, SET_LOGIN_SELLER, SET_PRODUCTS, SET_SELLER_INFO } from '../Redux/types/types';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import './css/Dashboard.css';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import OrdersIcon from '@material-ui/icons/ShoppingCartOutlined';
import ProductsIcon from '@material-ui/icons/ShoppingBasketOutlined';
import MessagesIcon from '@material-ui/icons/MessageOutlined';
import AccountIcon from '@material-ui/icons/PersonOutline';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import MenuIconClose from '@material-ui/icons/Menu';
import MenuIconOpen from '@material-ui/icons/KeyboardArrowLeftOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import { motion } from 'framer-motion';
import HomeDashboard from './HomeDashboard';
import ProductsDashboard from './ProductsDashboard';
import OrdersDashboard from './OrdersDashboard';
import MessageDashboard from './MessageDashboard';
import AccountDashboard from './AccountDashboard';
import ProductInfo from './innerComponents/jsx/ProductInfo';

function Dashboard() {

  const shopID = useSelector(state => state.sellerID.shopID);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLoginSeller);
  const userName = useSelector(state => state.userID);
  const dashstats = useSelector(state => state.dashboardstatus);
  const sellerID = useSelector(state => state.sellerID);
  const sellerinfo = useSelector(state => state.sellerinfo);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getsellerinfo/${shopID}`, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      dispatch({type: SET_SELLER_INFO, sellerinfo: response.data});
      // console.log(sellerinfo);
    }).catch((err) => console.log(err));
  }, [sellerinfo]);

  useEffect(() => {
    Axios.get("http://localhost:3001/loginsession", {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
    //   console.log(response.data);
      if(response.data.status){
        dispatch({type: SET_LOGIN_SELLER, loginstatusseller: response.data.status});
        dispatch({type: SET_ID_SELLER, sellerID: {shopID: response.data.userName, shopName: response.data.shopName}});
        // navigate("/dashboard");
        // console.log(sellerID);
      }
      else{
        dispatch({type: SET_LOGIN_SELLER, loginstatusseller: response.data.status});
        navigate("/login");
      }
    })
  }, [redirector, userName]);

  const logout = () => {
    //   alert("Okay!");
    dispatch({type: SET_LOGIN_SELLER, loginstatusseller: false});
    dispatch({type: SET_ID_SELLER, sellerID: ""});
    navigate("/login");
    localStorage.removeItem("tokenseller");
  }

  const OpennedMenu = () => {
    return(
      <ul id='nav_links'>
        <li>
          <p id='shopname'><StarIcon />{shopID}</p>
        </li>
        <li className='li_links'>
          <Link className='links_dash' to='/dashboard'><HomeIcon/>Home</Link>
        </li>
        <li className='li_links'>
          <Link className='links_dash' to='/dashboard/shopadmin'><ProductsIcon />Products</Link>
        </li>
        <li className='li_links'>
          <Link className='links_dash' to='/dashboard/orders'><OrdersIcon />Orders</Link>
        </li>
        <li className='li_links'>
          <Link className='links_dash' to='/dashboard/messages'><MessagesIcon />Messages</Link>
        </li>
        <li className='li_links'>
          <Link className='links_dash' to='/dashboard/account'><AccountIcon />Account</Link>
        </li>
          <li className='li_links logout_btn_menu'>
        <button id='btn_lgt' onClick={logout}>Logout</button>
        </li>
      </ul>
    )
  }

  // const DashboardComponents = () => {
  //   if(redirector){
  //       return(
        
  //       );
  //   }
  //   else{
  //       return ""
  //   }
  // }

  return (
    <div id='div_dashboard'>
            <motion.div id='nav_dashboard'
              animate={{
                maxWidth: dashstats? "40px" : "250px"
              }}
            >
              <div id='menu_btn'>
                <button id='btn_menu' onClick={() => {dispatch({type: SET_DASHBOARD, dashboardstatus: !dashstats})}}>{dashstats? <MenuIconClose /> : <MenuIconOpen />}</button>
              </div>
              <ul id='nav_menus'>
                <li>
                  <ul id='nav_links_closed'>
                    <li id={dashstats? "openned" : "closed"}>
                      <p id='shopname'><StarIcon style={{fontSize: "20px"}} /></p>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links'>
                      <Link className='links_dash_icons' to='/dashboard'><HomeIcon style={{fontSize: "20px"}} /></Link>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links'>
                      <Link className='links_dash_icons' to='/dashboard/shopadmin'><ProductsIcon style={{fontSize: "20px"}} /></Link>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links'>
                      <Link className='links_dash_icons' to='/dashboard/orders'><OrdersIcon style={{fontSize: "20px"}} /></Link>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links'>
                      <Link className='links_dash_icons' to='/dashboard/messages'><MessagesIcon style={{fontSize: "20px"}} /></Link>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links'>
                      <Link className='links_dash_icons' to='/dashboard/account'><AccountIcon style={{fontSize: "20px"}} /></Link>
                    </li>
                    <li id={dashstats? "openned" : "closed"} className='li_links logout_btn_menu_closed'>
                      <button id='btn_lgt_closed' onClick={logout}><LogoutIcon /></button>
                    </li>

                    <li id={dashstats? "closed" : "openned"}>
                      <p id='shopname'><StarIcon style={{fontSize: "20px"}} />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0
                      }}
                      >{shopID}</motion.span></p>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links'>
                      <Link className='links_dash' to='/dashboard'><div className='div_flexer'><HomeIcon style={{fontSize: "20px"}} />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0.1
                      }}
                      >Home</motion.span>
                      </div>
                      </Link>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links'>
                      <Link className='links_dash' to='/dashboard/shopadmin'><div className='div_flexer'><ProductsIcon style={{fontSize: "20px"}} />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0.2
                      }}
                      >Products</motion.span>
                      </div>
                      </Link>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links'>
                      <Link className='links_dash' to='/dashboard/orders'>
                      <div className='div_flexer'>
                      <OrdersIcon />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0.3
                      }}
                      >Orders</motion.span>
                      </div>
                      </Link>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links'>
                      <Link className='links_dash' to='/dashboard/messages'><div className='div_flexer'><MessagesIcon style={{fontSize: "20px"}} />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0.4
                      }}
                      >Messages</motion.span>
                      </div>
                      </Link>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links'>
                      <Link className='links_dash' to='/dashboard/account'><div className='div_flexer'><AccountIcon style={{fontSize: "20px"}} />
                      <motion.span
                      id='span_id'
                      animate={{
                        fontSize: dashstats? "0px" : "15px"
                      }}

                      transition={{
                        delay: dashstats? 0 : 0.5
                      }}
                      >Account</motion.span>
                      </div>
                      </Link>
                    </li>
                    <li id={dashstats? "closed" : "openned"} className='li_links logout_btn_menu_closed'>
                      <button id='btn_lgt' onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </motion.div>
            <Routes>
              <Route exact path='/' element={<HomeDashboard />} />
              <Route path='/shopadmin' element={<ProductsDashboard />} />
              <Route path='/shopadmin/:product_id' element={<ProductInfo />} />
              <Route path='/orders' element={<OrdersDashboard />} />
              <Route path='/messages/:user_id' element={<MessageDashboard />} />
              <Route path='/messages/*' element={<MessageDashboard />} />
              <Route path='/account' element={<AccountDashboard />} />
            </Routes>
        </div>
  )
}

export default Dashboard