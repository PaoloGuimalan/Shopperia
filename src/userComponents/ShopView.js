import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import CartIcon from '@material-ui/icons/ShoppingCartOutlined';
import './css/ShopView.css';
import ViewLogo from '../mainComponents/imgs/home_logo.png';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SHOP_PREVIEW } from '../Redux/types/types';

function ShopView() {

  const {shopID} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppreview = useSelector(state => state.shoppreview);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getShopPreview/${shopID}`).then((response) => {
      const {shop_preview, shopName, shopID, shopEmail} = response.data;
      dispatch({type: SHOP_PREVIEW, shoppreview: {shop_preview: shop_preview, shopName: shopName, shopID: shopID, shopEmail: shopEmail}});
      // console.log(shoppreview);
    }).catch((err) => console.log(err));
  }, [shopID])
  

  return (
    <div id='div_shopview'>
      <motion.button id='back_btn' title='Back'
      whileHover={{
        scale: 1.1
      }}
      ><ArrowBack style={{color: 'white'}} /></motion.button>
      <motion.button id='home_btn' title='Home'
      whileHover={{
        scale: 1.1
      }}
      onClick={() => {navigate(`/home`)}} ><HomeIcon style={{color: 'white'}} /></motion.button>
      <motion.button id='cart_btn' title='Cart'
      whileHover={{
        scale: 1.1
      }}
      onClick={() => {navigate(`/profile/pocket/cart`)}} ><CartIcon style={{color: 'white'}} /></motion.button>
      <div id='div_nav_shopview'>
        <nav id='nav_shopview'>
          <li>
            <nav id='nav_shopview_sec'>
              <li className='li_shopview_sec'>
                <div>
                  <img src={ViewLogo} id='img_logo_viewer'/>
                  <div id='div_shop_prev'>
                    <img src={shoppreview.shop_preview} id='shop_img_prev'/>
                    <span>
                      <p id='label_shop_prev'>{shoppreview.shopName}</p>
                      <p id='email_shop_prev'>{shoppreview.shopEmail}</p>
                    </span>
                  </div>
                </div>
              </li>
              <li className='li_shopview_sec'>
                <nav id='nav_info_shop'>
                  <li id='li_uno_btns'>
                    <button className='btns_shop_prev'>Follow</button>
                    <button className='btns_shop_prev'>Chat</button>
                  </li>
                  <li>
                    Hello
                  </li>
                </nav>
              </li>
            </nav>
          </li>
          <li>
            Navigations
          </li>
        </nav>
      </div>
    </div>
  )
}

export default ShopView