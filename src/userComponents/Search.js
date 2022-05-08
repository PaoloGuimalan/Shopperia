import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './css/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PRODRESULTS, SET_SEARCH, SET_SHOP_RESULT } from '../Redux/types/types';
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';
import Axios from 'axios';
import { motion } from 'framer-motion';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import UnselStarIcon from '@material-ui/icons/Star';

function Search() {

  const { query } = useParams();
  const queryunpack = query.split("_").join(" ");

  const searchvalue = useSelector(state => state.searchvalue);
  const searchprodresult = useSelector(state => state.resultsprods);
  const searchshopresult = useSelector(state => state.shopresult);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const axiosSearchGetter = (queryparam) => {
    Axios.get(`http://localhost:3001/searchproducts/${queryparam}`).then((response) => {
      // console.log(response.data);
      dispatch({type: SET_PRODRESULTS, prodsresults: response.data});
      // console.log(searchprodresult);
    }).catch((err) => {
      console.log(err);
    })
  }

  const axiosShopGetter = (queryparam) => {
    Axios.get(`http://localhost:3001/searchshop/${queryparam}`).then((response) => {
      dispatch({type: SET_SHOP_RESULT, shopresult: response.data});
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    axiosSearchGetter(query);
    axiosShopGetter(query);
  }, [queryunpack]);
  

  const searchbtnTrigger_sec = () => {
    const searchUrl = searchvalue.split(" ").join("_")
    navigate(`/search/${searchUrl}`);
  }

  return (
    <div id='div_search'>
        <nav className='nav_search'>
            <li className='li_home'>
              <button id='btn_back' onClick={() => {navigate("/home")}}><ArrowBack /></button>
            </li>
            <li className='li_home searchbar'>
              <div id='div_search_form'>
                <input type='text' name='search' id='search' onChange={(e) => {dispatch({type: SET_SEARCH, searchstate: e.target.value})}} value={searchvalue} placeholder='Search for a Product Name, Code, Category and Brands' />
                <button id='btn_search' onClick={searchbtnTrigger_sec} disabled={searchvalue == ""? true : false}><SearchIcon /></button>
              </div>
            </li>
            <li className='li_home search_label'>
                <h3 id='label_searchval'>Searched for: "{queryunpack}"</h3>
            </li>
        </nav>
        <nav id='whole_result'>
          <li id='li_first_res'>
            <p>Filters</p>
          </li>
          <li>
            <div id='div_results'>
              <ul id='ul_results'>
                <li style={{display: searchshopresult.length >= 1? "block" : "none"}}>
                  <h3>Stores</h3>
                  <ul id='ul_products_results'>
                    {searchshopresult.map((shop) => {
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
                </li>
                {/* <li>
                  <h3>Brands</h3>
                </li> */}
                <li style={{display: searchprodresult.length >= 1? "block" : "none"}}>
                  <h3>Products</h3>
                  <ul id='ul_products_results'>
                    {searchprodresult.map((items) => {
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
                </li>
              </ul>
            </div>            
          </li>
        </nav>
    </div>
  )
}

export default Search