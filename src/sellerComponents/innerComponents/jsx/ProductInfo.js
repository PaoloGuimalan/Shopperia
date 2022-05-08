import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../css/ProductInfo.css';
import BgLogo from '../imgs/bg_logo_profile.png';
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { SET_COMMENTS, SET_COMMENTS_PRODUCT, SET_PRODUCT_DETAILS_ADMIN, SET_VARIETY_VIEW } from '../../../Redux/types/types';
import StarIcon from '@material-ui/icons/Star';

function ProductInfo() {

  const {product_id} = useParams();
  const dispatch = useDispatch();
  const shopID = useSelector(state => state.sellerID.shopID);
  const productdetailsadmin = useSelector(state => state.productdetailsadmin);
  const commentsproduct = useSelector(state => state.commentsproduct);
  const varietyview = useSelector(state => state.varietyview);

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

  useEffect(() => {
    Axios.get(`http://localhost:3001/getCommentsProduct/${product_id}`, {
      headers:{
        "x-access-tokenseller": localStorage.getItem('tokenseller')
      }
    }).then((response) => {
      dispatch({type: SET_COMMENTS_PRODUCT, commentsproduct: response.data});
    }).catch((err) => {
      console.log(err);
    })
  }, [product_id, shopID]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getproductvarietyadmin/${product_id}`, {
      headers:{
        "x-access-tokenseller": localStorage.getItem('tokenseller')
      }
    }).then((response) => {
      dispatch({type: SET_VARIETY_VIEW, varietyview: response.data});
    }).catch((err) => {
      console.log(err);
    })
  }, [product_id]);

  return (
    <div id='div_productinfo'>
      <nav id='nav_productinfo'>
        <li>
          <div id='background_prev'>
          </div>
        </li>
        <li>
          <nav id='nav_main_view'>
            <li className='li_nav_prd'>
              <nav id='nav_details_prod'>
                <li className='li_main_details'>
                  <nav id='imgs_nav'>
                    <li>
                      <img src={productdetailsadmin.product.base_preview} id='prev_product'/>
                    </li>
                      {productdetailsadmin.variety.map((res) => {
                        return(
                          <li>
                            <img src={res.var_preview} className='var_product_prev'/>
                          </li>
                        )
                      })}
                  </nav>
                </li>
                <li className='li_main_details'>
                  <nav id='nav_info_details'>
                    <li>
                      <h4>{productdetailsadmin.product.prname} | {product_id}</h4>
                    </li>
                    <li>
                      <p id='star_label'><StarIcon style={{fontSize: "21px", color: "yellow"}} />{productdetailsadmin.product.rate}</p>
                    </li>
                    <li>
                      <h4>Description</h4>
                      <p id='desc_p'>{productdetailsadmin.product.prdesc}</p>
                    </li>
                  </nav>
                </li>
              </nav>
            </li>
            <li className='li_nav_prd'>
              <nav id='nav_side_details'>
                <li>
                  <h4 id='cmts_label'>Comments</h4>
                </li>
                <li className='li_comments_inside_array'>
                  <nav id=''>
                    {commentsproduct.map((cmts) => {
                      return(
                        <li>
                          <nav id='each_comment_nav'>
                            <li>
                              <p className='user_label'>{cmts.user_id}</p>
                            </li>
                            <li className='user_comment_class'>
                              <p>{cmts.user_comment}</p>
                            </li>
                            <li className='user_date_class'>
                              <p>{cmts.rate_date}</p>
                            </li>
                          </nav>
                        </li>
                      )
                    })}
                  </nav>
                </li>
              </nav>
            </li>
          </nav>
        </li>
        <li id='variety_li'>
          <h4>Product Variety</h4>
          <nav id='variety_container'>
              {varietyview.map((vw) => {
                return(
                  <li>
                  <nav className='nav_variety_list'>
                    <li className='li_cont_details'>
                      <img src={vw.var_preview} className='img_var_prod' />
                    </li>
                    <li className='li_cont_details'>
                      <table className='tbl_variety'>
                        <tbody>
                          <tr>
                            <td>
                              <h4 className='label_values_var'>{vw.var_id}</h4>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='label_values_var'>Type: {vw.var_typename}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='label_values_var'>Size: {vw.var_size}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='label_values_var'>Price: &#8369;{vw.var_price}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p className='label_values_var'>Stocks: {vw.var_stocks}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button className='btn_variety_func'>Edit</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  </nav>
                  </li>
                )
              })}
          </nav>
        </li>
      </nav>
    </div>
  )
}

export default ProductInfo