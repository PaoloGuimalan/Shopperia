import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../css/ProductInfo.css';
import BgLogo from '../imgs/bg_logo_profile.png';
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { SET_PRODUCT_DETAILS_ADMIN } from '../../../Redux/types/types';

function ProductInfo() {

  const {product_id} = useParams();
  const dispatch = useDispatch();
  const shopID = useSelector(state => state.sellerID.shopID);
  const productdetailsadmin = useSelector(state => state.productdetailsadmin);

  useEffect(() => { 
    if(product_id != "" && shopID != ""){
      Axios.get(`http://localhost:3001/getproductinfoadmin/${product_id}/${shopID}`, {
        headers:{
          "x-access-tokenseller": localStorage.getItem('tokenseller')
        }
      }).then((response) => {
        dispatch({type: SET_PRODUCT_DETAILS_ADMIN, productdetailsadmin: response.data})
        // console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [product_id, shopID]);

  return (
    <div id='div_productinfo'>
      <nav id='nav_productinfo'>
        <li>
          <div id='background_prev'>
          </div>
        </li>
        <li>
          <nav id='nav_details_prod'>
            <li>
              <img src={productdetailsadmin.product.base_preview} id='prev_product'/>
            </li>
            <li>
              <p>{product_id}</p>
            </li>
          </nav>
        </li>
      </nav>
    </div>
  )
}

export default ProductInfo