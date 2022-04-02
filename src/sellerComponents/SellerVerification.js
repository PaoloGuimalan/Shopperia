import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios';
import './css/SellerVerification.css'
import { useDispatch } from 'react-redux';
import { SET_ID_SELLER, SET_LOGIN_SELLER } from '../Redux/types/types';

function SellerVerification() {

    const { shopID, sellertoken } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [codever, setcodever] = useState("");
  
    const verifyAccount = () => {
      // alert(`${userName} | ${usertoken}`);
      Axios.post("http://localhost:3001/verifySeller", {
          shopID: shopID,
          sellertoken: sellertoken,
          userCode: codever
      },{
          headers: {
            "x-access-tokenseller": sellertoken
          },
      }).then((response) => {
        //   console.log(response.data);
          if(response.data.status){
            localStorage.setItem("tokenseller", sellertoken);
            dispatch({type: SET_LOGIN_SELLER, loginstatusseller: response.data.status});
            dispatch({type: SET_ID_SELLER, sellerID: shopID});
            navigate("/dashboard");
          }
      }).catch(err => console.log(err));
    }
  
    return (
      <div id='div_user_ver'>
          <input type='text' name='user_ver_text' id='user_ver_text' value={codever} onChange={(e) => {setcodever(e.target.value)}}/>
          <button onClick={verifyAccount}>Submit</button>
      </div>
    )
}

export default SellerVerification