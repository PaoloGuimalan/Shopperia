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
import PayPalOrder from './PayPalOrder';

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
  const [varieties, setvarieties] = useState({result: [], result2: []});

  const [typeselector, settypeselector] = useState("");
  const [sizeselector, setsizeselector] = useState("");

  const [varietyresponse, setvarietyresponse] = useState([]);
  const [varietycount, setvarietycount] = useState(0);

  const [alertprod, setalertprod] = useState("Message Sample");
  const [alertprodstatus, setalertprodstatus] = useState(false);
  const [alertprodtrigger, setalertprodtrigger] = useState(false);

  const [pmethod, setpmethod] = useState("none");
  const [ppl, setppl] = useState(false);

  const [emailcustomer, setemailcustomer] = useState("");

  const setStar = (number) => {
    setstarnum(number);
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/getemailcustomer/${userName}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      setemailcustomer(response.data);
      // console.log(emailcustomer);
    }).catch((err) => console.log(err));
  }, [emailcustomer, userName])
  

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

  useEffect(() => {
    const id = currentprod.map((ids) => ids.product_id);
    Axios.get(`http://localhost:3001/gettypes/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(varieties);
      // console.log(response.data.result.map((res1) => res1.var_typename));
      // console.log(response.data.result2.map((res2) => res2.var_size))
      setvarieties(response.data);
      // console.log(varieties);
    }).catch(err => console.log(err));
  }, [currentprod]);

  useEffect(() => {
    if(typeselector != "" && sizeselector != ""){
      const id = currentprod.map((ids) => ids.product_id);
      Axios.get(`http://localhost:3001/getselectedvariety/${id}/${typeselector}/${sizeselector}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        // console.log(response.data);
        setvarietyresponse(response.data);
      }).catch(err => console.log(err));
    }
  }, [typeselector, sizeselector, currentprod]);
  

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

  const product_Counter = (type) => {
    // alert(type);
    settypeselector(type);
  }

  const product_Size = (size) => {
    // alert(size);
    setsizeselector(size);
  }

  const dataOrder = {
    user_id: userName,
    receiver: addresses.map((rec) => rec.receiver)[0],
    full_address: addresses.map((rec) => rec.full_address)[0],
    city_town: addresses.map((rec) => rec.city_town)[0],
    province: addresses.map((rec) => rec.province)[0],
    postalCode: addresses.map((rec) => rec.postalCode)[0],
    product_id: currentprod.map((pid) => pid.product_id)[0],
    var_id: varietyresponse.map((vid) => vid.var_id)[0],
    variety: varietycount,
    status: floatvalue != ""? floatvalue == "add_cart"? "Cart" : "Pending" : "Cart",
    order_total: varietyresponse.map((vid) => vid.var_price)[0] * varietycount,
    pmethod: pmethod,
    email: emailcustomer,
    shopName: currentprod.map((name) => name.shopname).join("")
  }

  const order_submit = (order_value) => {
    Axios.get(`http://localhost:3001/usercredsvalidation/${userName}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((responseuno) => {
      if(responseuno.data.status == true){
        if(pmethod != "COD" && pmethod != "none"){
          if(pmethod == "PayPal"){
            setppl(true);
          }
        }
        else if(pmethod == "none"){
          if(floatvalue != "" && floatvalue == "add_cart"){
            Axios.post("http://localhost:3001/postorder", dataOrder, {
              headers: {
                "x-access-token": localStorage.getItem("token")
              },
            }).then((response) => {
              // console.log(response.data);
              setalertprod(response.data.message);
              setalertprodstatus(response.data.status);
              setTimeout(() => {
                setalertprodtrigger(true);
              }, 1000);
              setTimeout(() => {
                setalertprodtrigger(false);
              }, 5000);
              // setalertprod("");
              setalertprodstatus(false);
            }).catch((err) => console.log(err));
          }
          else{
            alert("No Mode of Payment!");
          }
        }
        else if(pmethod == "COD"){
          Axios.post("http://localhost:3001/postorder", dataOrder, {
            headers: {
              "x-access-token": localStorage.getItem("token")
            },
          }).then((response) => {
            // console.log(response.data);
            setalertprod(response.data.message);
            setalertprodstatus(response.data.status);
            setTimeout(() => {
              setalertprodtrigger(true);
            }, 1000);
            setTimeout(() => {
              setalertprodtrigger(false);
            }, 5000);
            // setalertprod("");
            setalertprodstatus(false);
          }).catch((err) => console.log(err));
        }
        else{
          alert("Hello")
        }
      }
      else{
        setalertprod(responseuno.data.message);
        setalertprodstatus(responseuno.data.status);
        setTimeout(() => {
          setalertprodtrigger(true);
        }, 1000);
        setTimeout(() => {
          setalertprodtrigger(false);
        }, 5000);
        setalertprodstatus(false);
      }
    }).catch((err) => console.log(err));
    // console.log(currentprod.map((name) => name.shopname).join(""));
  }

  return (
    <div id='div_pr_view'>
      <motion.div
      animate={{
        top: alertprodtrigger? "30px" : "-30px",
        backgroundColor: alertprodstatus == null? "white" : alertprodstatus? "lime" : "red"
      }} 
      id='alert_div'><span>{alertprod}</span></motion.div>
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
      onClick={() => {navigate(`/profile/pocket/cart`)}} ><CartIcon style={{color: 'white'}} /></motion.button>
      <motion.div
      animate={{
        height: floatbuy? "0px" : "auto",
        border: floatbuy? "none" : "solid 2px",
        borderImage: floatbuy? "none" : "linear-gradient(#e10013, #D60789) 1"
      }} 
      id='float_menu_buy'>
        {/* <p onClick={() => {setfloatbuy(true); setfloatvalue("");}}>Hello from {floatvalue}</p> */}
        <ul id='ul_main_pr'>
          <li>
            {addresses.map((def) => {
              return(
                <ul key={def.id} id='def_add'>
                  <li><p id='address_status'>Default Address</p></li>
                  <li><p><b>{def.receiver}</b></p></li>
                  <li><b>Full Address:</b> {def.full_address}</li>
                  <li><b>Province:</b> {def.province}</li>
                  <li><b>Postal Code:</b> {def.postalCode}</li>
                </ul>
              )
            })}
          </li>
          <li>
            <h4>Types</h4>
            {varieties.result.map((res1) => {
              return(
                <button onClick={() => {product_Counter(res1.var_typename)}} className='btns_var'>{res1.var_typename}</button>
              )
            })}
          </li>
          <li>
            <h4>Sizes</h4>
            {varieties.result2.map((res2) => {
              return(
                <button onClick={() => {product_Size(res2.var_size)}} className='btns_var'>{res2.var_size}</button>
              )
            })}
          </li>
          <li>
            {floatvalue != ""? floatvalue == "add_cart"? "" : (
              <>
                <h4>Payment Method</h4>
                <select id='select_account_dd' onChange={(e) => {setpmethod(e.target.value)}}>
                  <option default value="none">---select a method---</option>
                  <option value="COD">Cash On Delivery</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </>
            ) : ""}
          </li>
          <li>
            <h4>Quantity</h4>
            <div>
              <span><button onClick={() => {setvarietycount(varietycount + 1)}} className='btns_var_num'>+</button></span>
              <span><input id='display_count' type='number' value={varietycount} /></span>
              <span><button onClick={() => {setvarietycount(varietycount == 0? varietycount:varietycount - 1)}} className='btns_var_num'>-</button></span>
            </div>
          </li>
          <li>
            <h4>Order Summary</h4>
            {varietyresponse.map((details) => {
              return(
                <ul id='var_resp'>
                  <li>
                    <ul id='img_view_var'>
                      <li>
                        <img id='var_prev' src={details.var_preview} />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul id='details_var'>
                      <li><h4>{details.pr_id} | {details.var_id}</h4></li>
                      <li><span>Type: </span>{details.var_typename}</li>
                      <li>
                        <span>Size: </span>{details.var_size}
                      </li>
                      <li>
                        <span>Available Stocks: </span>{details.var_stocks}
                      </li>
                      <li>
                        <p><span>Price: </span><span>&#8369;{details.var_price}</span></p>
                      </li>
                      <li>
                        <p><span>Total Price: </span><span>&#8369;{details.var_price * varietycount}</span></p>
                      </li>
                    </ul>
                  </li>
                </ul>
              )
            })}
          </li>
          <li id='li_btns'>
            <button onClick={() => {order_submit(floatvalue)}} id={floatvalue != ''? floatvalue == 'add_cart'? "add_cart_btn" : "buy_pr_btn" : "..."} className='btns_float'>Confirm {floatvalue != ''? floatvalue == 'add_cart'? "Cart" : "Order" : "..."}</button>
            <button id='cancel_pr_btn' onClick={() => {setfloatbuy(true); setfloatvalue("");}} className='btns_float'>Cancel</button>
          </li>
          {ppl? (
            <li>
              <PayPalOrder dataOrder={dataOrder} />
            </li>
          ) : ""}
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
                        <p id='label_stars'>{tbldetails.overall? Math.round(tbldetails.overall * 10) / 10 : 0}
                        {tbldetails.overall >= 1? <UnselStarIcon style={{fontSize: "32px", color: "yellow"}} /> : <StarIcon style={{fontSize: "32px", color: "yellow"}} />}
                        {tbldetails.overall >= 2? <UnselStarIcon style={{fontSize: "32px", color: "yellow"}} /> : <StarIcon style={{fontSize: "32px", color: "yellow"}} />}
                        {tbldetails.overall >= 3? <UnselStarIcon style={{fontSize: "32px", color: "yellow"}} /> : <StarIcon style={{fontSize: "32px", color: "yellow"}} />}
                        {tbldetails.overall >= 4? <UnselStarIcon style={{fontSize: "32px", color: "yellow"}} /> : <StarIcon style={{fontSize: "32px", color: "yellow"}} />}
                        {tbldetails.overall >= 5? <UnselStarIcon style={{fontSize: "32px", color: "yellow"}} /> : <StarIcon style={{fontSize: "32px", color: "yellow"}} />}
                        </p>
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
                  {userName == ""? (
                      <>
                        You are not Logged In! <button onClick={() => navigate("/login")}>Login</button> | <button onClick={() => navigate("/register")}>Sign Up</button>
                      </>
                    ):(
                      <>
                        <button className='buy_btns' onClick={() => {setfloatbuy(false); setfloatvalue("add_cart")}} id='add_cart_btn'>Add to Cart</button>
                        <button className='buy_btns' onClick={() => {setfloatbuy(false); setfloatvalue("buy_prod")}} id='buy_pr_btn'>Buy</button>
                      </>
                    )}
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