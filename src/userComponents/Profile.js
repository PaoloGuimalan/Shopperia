import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { SET_LOGIN, SET_ID } from '../Redux/types/types'

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);

  useEffect(() => {
    Axios.get("http://localhost:3001/loginsession", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      // console.log(response.data);
      if(response.data.status){
        dispatch({type: SET_LOGIN, loginstatus: response.data.status});
        dispatch({type: SET_ID, userID: response.data.userName});
        navigate("/profile");
      }
      else{
        dispatch({type: SET_LOGIN, loginstatus: response.data.status});
        navigate("/login");
      }
    })
  }, [redirector, userName]);

  // useEffect(() => {
  //   if(redirector){
  //     navigate("/profile");
  //   }
  //   else{
  //     navigate("/login");
  //   }
  // }, [redirector])

  const logoutbtn = () => {
    dispatch({type: SET_LOGIN, loginstatus: false});
    dispatch({type: SET_ID, userID: ""});
    navigate("/home");
    localStorage.removeItem("token");
  }

  const ComponentVisual = () => {
    if(redirector){
      return <div>
        <h2>Profile</h2>
        {redirector? userName : "Not Logged In!"}<br />
        <Link to='/home' >Home</Link><br />
        <button onClick={logoutbtn}>Logout</button>
      </div>
    }
    else{
      return ""
    }
  }

  return (
    <ComponentVisual />
  )
}

export default Profile