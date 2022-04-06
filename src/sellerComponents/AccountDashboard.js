import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { SET_DASHBOARD, SET_ID_SELLER, SET_LOGIN_SELLER, SET_PRODUCTS, SET_SELLER_INFO, SET_SHOP_ADDRESS, SET_SHOP_NUMBER } from '../Redux/types/types';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import { motion } from 'framer-motion';
import './css/AccountDashboard.css';
import barangay from 'barangay';


function AccountDashboard() {

  const shopID = useSelector(state => state.sellerID.shopID);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLoginSeller);
  const userName = useSelector(state => state.userID);
  const dashstats = useSelector(state => state.dashboardstatus);
  const sellerID = useSelector(state => state.sellerID);
  const sellerinfo = useSelector(state => state.sellerinfo);
  const shopaddress = useSelector(state => state.shopaddress);
  const shopnumber = useSelector(state => state.shopnumber);

  const [shopico, setshopico] = useState();

  const [selectedregion, setselectedregion] = useState("");
  const [selectedprovince, setselectedprovince] = useState("");
  const [selectedtowncit, setselectedtowncit] = useState("");
  const [selectedbrgys, setselectedbrgys] = useState("");
  const [houseno, sethouseno] = useState("");
  const [street, setstreet] = useState("");
  const [postalCode, setpostalCode] = useState("");

  const [provinces, setprovinces] = useState([]);
  const [towncit, settowncit] = useState([]);
  const [brgys, setbrgys] = useState([]);
  // const [first, setfirst] = useState(second)
  const [conumber, setconumber] = useState("");

  const region = barangay();
  // const provinces = barangay(selectedregion);
  // const towncit = barangay(selectedregion, selectedprovince);

  useEffect(() => {
    // console.log(sellerinfo);
    // console.log(region);
  }, [sellerinfo])

  useEffect(() => {
    setprovinces(barangay(selectedregion));
    // setselectedtowncit("");
  }, [selectedregion])

  useEffect(() => {
    settowncit(barangay(selectedregion, selectedprovince));
    // setselectedbrgys("");
  }, [selectedprovince])

  useEffect(() => {
    setbrgys(barangay(selectedregion, selectedprovince, selectedtowncit));
  }, [selectedtowncit])
  
  useEffect(() => {
    Axios.all([
      Axios.get(`http://localhost:3001/shopaddressget/${shopID}`, {
        headers: {
          "x-access-tokenseller": localStorage.getItem("tokenseller")
        },
      }).then((response) => {
        dispatch({type: SET_SHOP_ADDRESS, shopaddress: response.data});
      }).catch((err) => console.log(err)),
      Axios.get(`http://localhost:3001/getshopcontactnumber/${shopID}`,{
        headers: {
          "x-access-tokenseller": localStorage.getItem("tokenseller")
        },
      }).then((response) => {
        dispatch({type: SET_SHOP_NUMBER, shopnumber: response.data});
      }).catch((err) => console.log(err)),
    ])
  }, [shopID, shopaddress, shopnumber])
  

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

  const confAddress = () => {
    Axios.post('http://localhost:3001/confirmshopaddress', {
      shopID: shopID,
      houseno: houseno,
      street: street,
      barangay: selectedbrgys,
      city_town: selectedtowncit,
      province: selectedprovince,
      region: selectedregion,
      postalCode: postalCode
    },{
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      if(response.data.status){
        sethouseno("");
        setstreet("");
        setselectedbrgys("")
        setselectedtowncit("");
        setselectedprovince("");
        setselectedregion("");
        setpostalCode("");
      }
    }).catch((err) => console.log(err));
  }

  const sendSMS = () => {
    // alert(conumber);
    Axios.post('http://localhost:3001/sendSMSseller', {
      shopID: shopID,
      conumber: conumber
    },{
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      if(response.data.status){
        setconumber("");
      }
    }).catch((err) => {console.log(err)});
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
                  <p className='label_indicators'><b>Full Address: </b>{shopaddress}</p>
                  <p className='label_indicators'><b>Contact Number: </b>{shopnumber.contactNumber}</p>
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
        <li className='li_lever_account_inputs'>
            <h4 id='label_account_info'>Shop Address</h4>
            <ul id='ul_account_prev_inputs'>
              {/* <li>
                <p>{houseno}, {street}, {selectedbrgys}, {selectedtowncit}, {selectedprovince}, {selectedregion}, {postalCode}</p>
              </li> */}
              <li>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span><b>House No/ Bldg.</b> </span>
                      </td>
                      <td>
                        <input type='text' name='houseno' id='houseno' value={houseno} onChange={(e) => {sethouseno(e.target.value)}} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span><b>Street</b> </span>
                      </td>
                      <td>
                        <input type='text' name='street' id='street' value={street} onChange={(e) => {setstreet(e.target.value)}} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span><b>Region</b> </span>
                      </td>
                      <td>
                        <select id='select_regions' onChange={(e) => {setselectedregion(e.target.value)}}>
                          <option default value=''>---select a region---</option>
                          {region.map((reg) => {
                            return(
                              <option key={reg} value={reg}>{reg}</option>
                            )
                          })}
                        </select>
                      </td>
                    </tr>
                    {selectedregion != ""? (
                      <tr>
                        <td>
                          <span><b>Province</b> </span>
                        </td>
                        <td>
                          <select id='select_regions' onChange={(e) => {setselectedprovince(e.target.value)}}>
                            <option default value=''>---select a province---</option>
                            {provinces.map((prov) => {
                              return(
                                <option key={prov} value={prov}>{prov}</option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>
                    ):""}
                    {selectedprovince != ""? (
                      <tr>
                        <td>
                          <span><b>City/Town</b> </span>
                        </td>
                        <td>
                          <select id='select_regions' onChange={(e) => {setselectedtowncit(e.target.value)}}>
                            <option default value=''>---select a city/town---</option>
                            {towncit.map((tc) => {
                              return(
                                <option key={tc} value={tc}>{tc}</option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>
                    ):""}
                    {selectedtowncit != ""? (
                      <tr>
                        <td>
                          <span><b>Barangay</b> </span>
                        </td>
                        <td>
                          <select id='select_regions' onChange={(e) => {setselectedbrgys(e.target.value)}}>
                            <option default value=''>---select a barangay---</option>
                            {brgys.map((bg) => {
                              return(
                                <option key={bg} value={bg}>{bg}</option>
                              )
                            })}
                          </select>
                        </td>
                      </tr>
                    ):""}
                    <tr>
                      <td>
                        <span><b>Postal Code</b> </span>
                      </td>
                      <td>
                        <input type='text' name='postalCode' id='postalCode' value={postalCode} onChange={(e) => {setpostalCode(e.target.value)}} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <button onClick={confAddress}>Confirm Address</button>
              </li>
            </ul>
        </li>
        <li className='li_lever_account_inputs'>
          <h4 id='label_account_info'>Contact Number</h4>
            <ul id='ul_account_prev_inputs'>
              <li>
                <input type='number' name='shop_icon' id='shop_icon' value={conumber} onChange={(e) => {setconumber(e.target.value)}}/>
                <button onClick={() => sendSMS()}>Verify Number</button>
              </li>
            </ul>
        </li>
      </nav>
    </div>
  )
}

export default AccountDashboard