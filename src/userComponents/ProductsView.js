import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './css/ProductsView.css'
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CartIcon from '@material-ui/icons/ShoppingCartOutlined';
import Axios from 'axios';
import { SET_BROWSED_PROD, SET_VARIETY } from '../Redux/types/types';

function ProductsView() {

  const {queryID} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchvalue = useSelector(state => state.searchvalue);
  const currentprod = useSelector(state => state.browsedprod);
  const currentprodvarieties = useSelector(state => state.prodvarieties);
  const searchprodresult = useSelector(state => state.resultsprods);

  const queryback = searchvalue.split(" ").join("_");

  useEffect(() => {
    let mounted = true;
    Axios.all([
      Axios.get(`http://localhost:3001/getProductUser/${queryID}`).then((response) => {
        if(mounted){
          dispatch({type: SET_BROWSED_PROD, browsedprod: response.data});
        }
      }).catch((err) => console.log(err)),
      Axios.get(`http://localhost:3001/allvarieties/${queryID}`).then((response) => {
        if(mounted){
          dispatch({type: SET_VARIETY, varieties: response.data});
        }
      }).catch((err) => console.log(err))
    ])
    return () => mounted = false;
  }, []);

  const hoverstartimg = (link) => {
    setTimeout(() => {
      const main_preview = document.getElementById('base_prev_img');
      main_preview.src = link;
    }, 100);
  }
  

  return (
    <div id='div_pr_view'>
      <motion.button id='back_btn' title='Back'
      whileHover={{
        scale: 1.1
      }}
      onClick={() => {navigate(`/search/${queryback}`)}} ><ArrowBack style={{color: 'white'}} /></motion.button>
      <motion.button id='home_btn' title='Home'
      whileHover={{
        scale: 1.1
      }}
      onClick={() => {navigate(`/home`)}} ><HomeIcon style={{color: 'white'}} /></motion.button>
      <motion.button id='cart_btn' title='Cart'
      whileHover={{
        scale: 1.1
      }}
      onClick={() => {navigate(`/pocket/cart`)}} ><CartIcon style={{color: 'white'}} /></motion.button>
      <div id='pr_content'>
        <nav id='nav_content'>
          <li>
            {currentprod.map((details) => {
              return(
                <ul id='ul_content' key={details.product_id}>
                  <li>
                    <img id='base_prev_img' src={details.base_preview} />
                    <ul id='ul_varieties_img'>
                      {currentprodvarieties.map((imgs) => {
                        return(
                          <li>
                            <motion.img whileHover={{scale: 1.1}} onHoverStart={() => {hoverstartimg(imgs.var_preview)}} onHoverEnd={() => {hoverstartimg(details.base_preview)}} className='imgs_varieties' src={imgs.var_preview} />
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              )
            })}
          </li>
          <li id='li_details'>
            <table id='tbl_details'>
              <tbody>
                {currentprod.map((tbldetails) => {
                  return(
                    <>
                    <tr>
                      <td>
                        <p id='label_name'>{tbldetails.prname}</p>
                        <p id='label_shop'>{tbldetails.prbrand} | {tbldetails.shopname}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p id='label_price'>&#8369;{tbldetails.minPrice} - &#8369;{tbldetails.maxPrice}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p id='label_desc'><b>Description</b> <br /><br />{tbldetails.prdesc}</p>
                      </td>
                    </tr>
                    </>
                  )
                })}
                <tr id='tr_btns'>
                  <td id='td_btns'>
                    <button className='buy_btns' id='add_cart_btn'>Add to Cart</button>
                    <button className='buy_btns' id='buy_pr_btn'>Buy</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </nav>
      </div>
    </div>
  )
}

export default ProductsView