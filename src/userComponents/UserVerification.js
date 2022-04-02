import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios';
import './css/UserVerification.css'
import { useDispatch } from 'react-redux';
import { SET_ID, SET_LOGIN } from '../Redux/types/types';

function UserVerification() {

  const { userName, usertoken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [codever, setcodever] = useState("");

  const verifyAccount = () => {
    // alert(`${userName} | ${usertoken}`);
    Axios.post("http://localhost:3001/verifyUser", {
        userName: userName,
        usertoken: usertoken,
        userCode: codever
    },{
        headers: {
          "x-access-token": usertoken
        },
    }).then((response) => {
        // console.log(response.data);
        if(response.data.status){
            localStorage.setItem("token", usertoken);
            dispatch({type: SET_LOGIN, loginstatus: response.data.status});
            dispatch({type: SET_ID, userID: userName});
            navigate("/home");
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

export default UserVerification