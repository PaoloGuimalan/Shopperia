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
    <React.Fragment>
      <div id='div_user_ver'>
      </div>

      <div id='div_user_ver_input'>
        <nav id='nav_inputs_ver'>
          <li>
            <p id='note_label_ver'>Please check your email that were used in the registration for the verification code.</p>
          </li>
          <li>
            <input type='text' name='user_ver_text' id='user_ver_text' placeholder='Verification Code' value={codever} onChange={(e) => {setcodever(e.target.value)}}/>
          </li>
          <li>
            <button onClick={verifyAccount} id='btn_user_ver'>Submit</button>
          </li>
          <li>
            <p id='note_label'>This code will be verifying if the account is really yours and for future security of your account.</p>
          </li>
        </nav>
      </div>
    </React.Fragment>
  )
}

export default UserVerification