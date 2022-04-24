import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import CartIcon from '@material-ui/icons/ShoppingCartOutlined';
import './css/ShopView.css';
import ViewLogo from '../mainComponents/imgs/home_logo.png';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { SET_PRBR_SHOP, SET_SHOP_PR, SHOP_PREVIEW, TOGGLE_CHAT_BOX } from '../Redux/types/types';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import UnselStarIcon from '@material-ui/icons/Star';

function ShopView() {

  const {shopID} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shoppreview = useSelector(state => state.shoppreview);
  const shoppr = useSelector(state => state.shoppr);
  const prbrshop = useSelector(state => state.prbrshop);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getShopPreview/${shopID}`).then((response) => {
      const {shop_preview, shopName, shopID, shopEmail, fullAddress, shopRating, contactNumber} = response.data;
      dispatch({type: SHOP_PREVIEW, shoppreview: {shop_preview: shop_preview, shopName: shopName, shopID: shopID, shopEmail: shopEmail, shopAddress: fullAddress, shopRating: shopRating, contactNumber: contactNumber}});
      // console.log(shoppreview);
    }).catch((err) => console.log(err));
  }, [shopID])
  
  const chatBox = (open, user) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: user}});
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/getShopCatBrand/${shopID}`).then((response) => {
      dispatch({type: SET_PRBR_SHOP, prbrshop: response.data});
      // console.log(prbrshop);
    }).catch((err) => {
      console.log(err);
    })
  }, [shopID])

  useEffect(() => {
    Axios.get(`http://localhost:3001/productsShop/${shopID}`).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_SHOP_PR, shoppr: response.data});
      // console.log(searchprodresult);
    }).catch((err) => {
      console.log(err);
    })
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
      <div id='div_container'>
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
                    <button className='btns_shop_prev' onClick={() => chatBox(true, shoppreview.shopID)}>Chat</button>
                  </li>
                  <li>
                    <table id='tbl_shopview'>
                      <tbody>
                        <tr>
                          <td style={{display: "flex"}}>
                            <span style={{fontSize: "20px"}}>{Math.round(shoppreview.shopRating * 10) / 10}</span>
                            <span>{shoppreview.shopRating >= 1? <UnselStarIcon style={{fontSize: "28px", color: "yellow"}} /> : <StarIcon style={{fontSize: "28px", color: "yellow"}} />}</span>
                            <span>{shoppreview.shopRating >= 2? <UnselStarIcon style={{fontSize: "28px", color: "yellow"}} /> : <StarIcon style={{fontSize: "28px", color: "yellow"}} />}</span>
                            <span>{shoppreview.shopRating >= 3? <UnselStarIcon style={{fontSize: "28px", color: "yellow"}} /> : <StarIcon style={{fontSize: "28px", color: "yellow"}} />}</span>
                            <span>{shoppreview.shopRating >= 4? <UnselStarIcon style={{fontSize: "28px", color: "yellow"}} /> : <StarIcon style={{fontSize: "28px", color: "yellow"}} />}</span>
                            <span>{shoppreview.shopRating >= 5? <UnselStarIcon style={{fontSize: "28px", color: "yellow"}} /> : <StarIcon style={{fontSize: "28px", color: "yellow"}} />}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p id='address_label'>{shoppreview.shopAddress}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p id='address_label'>Contact Number: {shoppreview.contactNumber}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </nav>
              </li>
            </nav>
          </li>
        </nav>
      </div>
      </div>
      <div id='div_content_shopview'>
        <nav id='nav_content_shopview'>
          <li className='li_nav_content'>
            <h4 id='label_fnav'>Categories</h4>
            <table id='table_prcat'>
              <tbody>
                {prbrshop.result.map((pr) => {
                  return(
                    <tr key={pr.prcat}>
                      <td>
                        <span className='links_label_shop'>{pr.prcat}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <h4 id='label_fnav'>Brands</h4>
            <table id='table_prcat'>
              <tbody>
                {prbrshop.result2.map((pr) => {
                  return(
                    <tr key={pr.prbrand}>
                      <td>
                        <span className='links_label_shop'>{pr.prbrand}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </li>
          <li className='li_nav_content'>
              <ul id='ul_products_results_shop'>
                    {shoppr.map((items) => {
                      return(
                      <Link className='link_products' key={items.product_id} to={`/productsView/${items.product_id}`} >
                        <motion.li
                        className='under_li_res' key={items.product_id}>
                          <nav
                          className='nav_products_shop'>
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
          </li>
        </nav>
      </div>
    </div>
  )
}

export default ShopView