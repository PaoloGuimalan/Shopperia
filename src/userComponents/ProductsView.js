import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './css/ProductsView.css'
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import StarIcon from '@material-ui/icons/StarBorderOutlined';
import UnselStarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CartIcon from '@material-ui/icons/ShoppingCartOutlined';
import Axios from 'axios';
import { SET_ADDRESSES, SET_ADDRESSES_VIEW, SET_BROWSED_PROD, SET_COMMENTS, SET_VARIETY } from '../Redux/types/types';

function ProductsView() {

  const {queryID} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchvalue = useSelector(state => state.searchvalue);
  const currentprod = useSelector(state => state.browsedprod);
  const currentprodvarieties = useSelector(state => state.prodvarieties);
  const currentprodcomments = useSelector(state => state.commentsProd);
  const searchprodresult = useSelector(state => state.resultsprods);
  const userName = useSelector(state => state.userID);
  const addresses = useSelector(state => state.addressView);

  const queryback = searchvalue.split(" ").join("_");

  const [floatbuy, setfloatbuy] = useState(true);
  const [floatvalue, setfloatvalue] = useState("");
  const [starnum, setstarnum] = useState(0);
  const [textar, settextar] = useState("")

  const setStar = (number) => {
    setstarnum(number);
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAddressesView/${userName}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        dispatch({type: SET_ADDRESSES_VIEW, addressView: response.data});
        // console.log(addresses);
    }).catch(err => console.log(err));
  }, [userName, addresses])

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
      }).catch((err) => console.log(err)),
      Axios.get(`http://localhost:3001/getComments/${queryID}`).then((response) => {
        if(mounted){
          dispatch({type: SET_COMMENTS, commentsState: response.data});
        }
      }).catch((err) => console.log(err))
    ])
    return () => mounted = false;
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getComments/${queryID}`).then((response) => {
        dispatch({type: SET_COMMENTS, commentsState: response.data});
    }).catch((err) => console.log(err))
  }, [currentprodcomments]);

  const hoverstartimg = (link) => {
    setTimeout(() => {
      const main_preview = document.getElementById('base_prev_img');
      main_preview.src = link;
    }, 100);
  }

  const postComment = () => {
    Axios.post("http://localhost:3001/postComment", {
      product_id: currentprod.map((id) => id.product_id).join(""),
      user_id: userName,
      user_comment: textar,
      user_rating: starnum
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      if(response.data.status == true){
        setstarnum(0);
        settextar("");
      }
    }).catch((err) => {
      console.log(err);
    })
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
      <motion.div
      animate={{
        height: floatbuy? "0px" : "auto",
        border: floatbuy? "none" : "solid 2px",
        borderImage: floatbuy? "none" : "linear-gradient(#e10013, #D60789) 1"
      }} 
      id='float_menu_buy'>
        {/* <p onClick={() => {setfloatbuy(true); setfloatvalue("");}}>Hello from {floatvalue}</p> */}
        <ul id='ul_main'>
          <li>
            {addresses.map((def) => {
              return(
                <ul key={def.id} id='def_add'>
                  <li><p><b>{def.receiver}</b></p></li>
                  <li><b>Full Address:</b> {def.full_address}</li>
                  <li><b>Province:</b> {def.province}</li>
                  <li><b>Postal Code:</b> {def.postalCode}</li>
                </ul>
              )
            })}
          </li>
          <li>
            <button className='btns_float'>Confirm {floatvalue != ''? floatvalue == 'add_cart'? "Cart" : "Order" : "..."}</button>
            <button onClick={() => {setfloatbuy(true); setfloatvalue("");}} className='btns_float'>Cancel</button>
          </li>
        </ul>
      </motion.div>
      <div id='pr_content'
      style={{
        filter: floatbuy? "blur(0px)" : "blur(20px)"
      }} 
      >
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
                          <li key={imgs.var_id}>
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
                    <tr>
                      <td>
                        <details>
                        <summary><b>Varieties</b></summary>
                          <table>
                            <tbody>
                              {currentprodvarieties.map((varts) => {
                                return(
                                  <tr key={varts.var_id}>
                                    <td>
                                      {varts.var_typename}
                                    </td>
                                    <td>
                                      |
                                    </td>
                                    <td>
                                      {varts.var_size}
                                    </td>
                                    <td>
                                      |
                                    </td>
                                    <td>
                                      {varts.var_price}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </details>
                      </td>
                    </tr>
                    </>
                  )
                })}
                <tr id='tr_btns'>
                  <td id='td_btns'>
                    <button className='buy_btns' onClick={() => {setfloatbuy(false); setfloatvalue("add_cart")}} id='add_cart_btn'>Add to Cart</button>
                    <button className='buy_btns' onClick={() => {setfloatbuy(false); setfloatvalue("buy_prod")}} id='buy_pr_btn'>Buy</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </nav>
        <div id='div_ratings'>
          <nav id='ratings_nav'>
            <li>
              <h3>Ratings | Comments</h3>
            </li>
                {userName == ""? (
                  <li>
                    You are not Logged In! <button onClick={() => navigate("/login")}>Login</button> | <button onClick={() => navigate("/register")}>Sign Up</button>
                  </li>
                ):(
                  <>
                    <li>
                        <p>
                          <span onClick={() => setStar(1)} className='star_btns'>{starnum >= 1? <UnselStarIcon style={{color: 'yellow', fontSize: '30px'}} />:<StarIcon style={{fontSize: '30px'}} />}</span>
                          <span onClick={() => setStar(2)} className='star_btns'>{starnum >= 2? <UnselStarIcon style={{color: 'yellow', fontSize: '30px'}} />:<StarIcon style={{fontSize: '30px'}} />}</span>
                          <span onClick={() => setStar(3)} className='star_btns'>{starnum >= 3? <UnselStarIcon style={{color: 'yellow', fontSize: '30px'}} />:<StarIcon style={{fontSize: '30px'}} />}</span>
                          <span onClick={() => setStar(4)} className='star_btns'>{starnum >= 4? <UnselStarIcon style={{color: 'yellow', fontSize: '30px'}} />:<StarIcon style={{fontSize: '30px'}} />}</span>
                          <span onClick={() => setStar(5)} className='star_btns'>{starnum >= 5? <UnselStarIcon style={{color: 'yellow', fontSize: '30px'}} />:<StarIcon style={{fontSize: '30px'}} />}</span>
                        </p>
                    </li>
                    <li>
                      <textarea id='comment_box' value={textar} onChange={(e) => {settextar(e.target.value)}}></textarea>
                    </li>
                    <li>
                      <button disabled={textar != "" && starnum != 0? false:true} onClick={() => postComment()}>Submit</button>
                    </li>
                  </>
                )}
            <li>
              <hr />
            </li>
            <li id='comments_results'>
              <table id='table_comments'>
                <tbody>
                  {currentprodcomments.map((listCom,i) => {
                    return(
                      <>
                      <tr key={listCom.id}>
                        <td>
                          <span><b>{listCom.user_id}</b></span>
                          <span> | </span>
                          <span className='star_display'>{listCom.user_rating >= 1? <UnselStarIcon style={{color: 'yellow', fontSize: '20px'}} />:<StarIcon style={{fontSize: '20px'}} />}</span>
                          <span className='star_display'>{listCom.user_rating >= 2? <UnselStarIcon style={{color: 'yellow', fontSize: '20px'}} />:<StarIcon style={{fontSize: '20px'}} />}</span>
                          <span className='star_display'>{listCom.user_rating >= 3? <UnselStarIcon style={{color: 'yellow', fontSize: '20px'}} />:<StarIcon style={{fontSize: '20px'}} />}</span>
                          <span className='star_display'>{listCom.user_rating >= 4? <UnselStarIcon style={{color: 'yellow', fontSize: '20px'}} />:<StarIcon style={{fontSize: '20px'}} />}</span>
                          <span className='star_display'>{listCom.user_rating >= 5? <UnselStarIcon style={{color: 'yellow', fontSize: '20px'}} />:<StarIcon style={{fontSize: '20px'}} />}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>{listCom.user_comment}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className='rate_date'>{listCom.rate_date}</span>
                        </td>
                      </tr>
                      <tr className='tr_underline'>
                        <td>
                          <hr />
                        </td>
                      </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </li>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default ProductsView