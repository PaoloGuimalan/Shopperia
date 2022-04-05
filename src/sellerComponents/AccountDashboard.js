import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { SET_DASHBOARD, SET_ID_SELLER, SET_LOGIN_SELLER, SET_PRODUCTS, SET_SELLER_INFO } from '../Redux/types/types';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import { motion } from 'framer-motion';
import './css/AccountDashboard.css';


function AccountDashboard() {

  const shopID = useSelector(state => state.sellerID.shopID);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLoginSeller);
  const userName = useSelector(state => state.userID);
  const dashstats = useSelector(state => state.dashboardstatus);
  const sellerID = useSelector(state => state.sellerID);
  const sellerinfo = useSelector(state => state.sellerinfo);

  const [shopico, setshopico] = useState();

  useEffect(() => {
    // console.log(sellerinfo);
  }, [sellerinfo])

  const upload = () => {
    // alert("Hello");
    if(shopico != null || shopID != undefined){
      const formico = new FormData();
      formico.append("ico", shopico);
      formico.append('shopID', shopID);

      Axios.post(`http://localhost:3001/updateshopico`, formico, {
        headers: {
          "x-access-tokenseller": localStorage.getItem("tokenseller"),
          "Content-Type": 'multipart/form-data'
        },
      }).then((response) => {

      }).catch(err => console.log(err));
    }
  }

  return (
    <div id='div_account'>
      <div id='background_drop'></div>
      <nav id='nav_account'>
        <li className='li_nav_preview'>
            <h4 id='label_shop_account'>Shop Details Preview</h4>
        </li>
        <li className='li_nav_preview'>
          <ul id='ul_account_prev'>
            <li className='li_ul_prev uno_prev'>
              {sellerinfo.map((shop) => {
                return(
                  <div className='div_account_prev'>
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
                )
              })}
            </li>
            <li className='li_ul_prev segundo_prev'>
              <ul id='ul_details_shop'>
                <li>
                  <h4 id='label_details'>Shop Details</h4>
                </li>
                <li>
                  <p className='label_indicators'><b>Full Address:</b> </p>
                  <p className='label_indicators'><b>Contact Number:</b> </p>
                  <p className='label_indicators'><b>Email:</b> {sellerinfo.map((email) => email.email)}</p>
                  <p className='full_name_details'><b>Owner:</b> {sellerinfo.map((email) => email.full_name)}</p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className='li_lever_account_inputs'>
            <h4 id='label_account_info'>Change Shop Icon</h4>
            <ul id='ul_account_prev_inputs'>
              <li>
                <input type='file' name='shop_icon' id='shop_icon' files={shopico} onChange={(e) => {setshopico(e.target.files[0])}}/>
                <button disabled={shopico == undefined? true:false} onClick={upload}>Upload</button>
              </li>
            </ul>
        </li>
      </nav>
    </div>
  )
}

export default AccountDashboard