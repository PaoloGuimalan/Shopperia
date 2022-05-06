import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './css/Login.css';
import { useDispatch } from 'react-redux';
import { SET_ID, SET_ID_SELLER, SET_LOGIN, SET_LOGIN_SELLER } from '../Redux/types/types'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { motion } from 'framer-motion';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loaderBar, setloaderBar] = useState(false);
  const [messageAlert, setmessageAlert] = useState(false);
  const [alertcontentresult, setalertcontentresult] = useState(false);
  const [alertcontent, setalertcontent] = useState("")

  const [acc, setacc] = useState(null)

  const loginCredentials = () => {
    //   alert("Logged In!");
    // dispatch({type: SET_ID, userID: true});
    // navigate("/home");
    if(acc == "buyer"){
        Axios.post('http://localhost:3001/loginUser', {
            userEmail: email,
            userPassword: password,
            acctype: acc
        }).then((response) => {
            // console.log(response.data);
            setloaderBar(response.data.status);
            if(response.data.status){
               if(response.data.verified){
                    // console.log(response.data.token);
                    setTimeout(() => {
                        localStorage.setItem("token", response.data.token);
                        dispatch({type: SET_LOGIN, loginstatus: response.data.status});
                        dispatch({type: SET_ID, userID: response.data.userName});
                        navigate("/home");
                    }, 2000);
               }
               else{
                    setalertcontentresult(response.data.status);
                    setmessageAlert(true);
                    setalertcontent(response.data.message);
                    setTimeout(() => {
                        setalertcontent("");
                        setmessageAlert(false);
                        setalertcontentresult(response.data.status);
                        navigate(`/userverification/${response.data.userName}/${response.data.token}`);
                    }, 3000);
               }
            }
            else{
                setalertcontentresult(response.data.status);
                setmessageAlert(true);
                setalertcontent(response.data.message);
                setTimeout(() => {
                    setalertcontent("");
                    setmessageAlert(false);
                    setalertcontentresult(response.data.status);
                }, 3000);
            }
        })
    }
    else if(acc == "seller"){
        // alert("Seller not done!");
        Axios.post('http://localhost:3001/loginUser', {
            userEmail: email,
            userPassword: password,
            acctype: acc
        }).then((response) => {
            // console.log(response.data);
            setloaderBar(response.data.status);
            if(response.data.status){
                // console.log(response.data.token);
                if(response.data.verified){
                    // console.log(response.data.token);
                    setTimeout(() => {
                        // console.log(response.data.tokenseller);
                        localStorage.setItem("tokenseller", response.data.tokenseller);
                        dispatch({type: SET_LOGIN_SELLER, loginstatusseller: response.data.status});
                        dispatch({type: SET_ID_SELLER, sellerID: response.data.userName});
                        navigate("/dashboard");
                    }, 2000);
               }
               else{
                    setalertcontentresult(response.data.status);
                    setmessageAlert(true);
                    setalertcontent(response.data.message);
                    setTimeout(() => {
                        setalertcontent("");
                        setmessageAlert(false);
                        setalertcontentresult(response.data.status);
                        navigate(`/sellerverification/${response.data.userName}/${response.data.tokenseller}`);
                    }, 3000);
               }
            }
            else{
                setalertcontentresult(response.data.status);
                setmessageAlert(true);
                setalertcontent(response.data.message);
                setTimeout(() => {
                    setalertcontent("");
                    setmessageAlert(false);
                    setalertcontentresult(response.data.status);
                }, 3000);
            }
        })
    }
    else{
        alert("Please Select a user type!");
    }
  }

  return (
    <div id='login_div'>
        <motion.div id='alert_prompts'
                    animate={{
                        width: messageAlert? "200px" : "0px",
                        backgroundColor: alertcontentresult? "lime" : "red"
                    }}
                    transition={{
                        delay: messageAlert? 0 : 0
                    }}
                >
                    <motion.p
                        animate={{
                            opacity: messageAlert? 1 : 0
                        }}

                        transition={{
                            delay: 0
                        }}
                    id='alert_label'>{alertcontent}</motion.p>
                </motion.div>
        <nav id='nav_login_overall'>
            <li className='li_login_overall'>
            </li>
            <li className='li_login_overall'>
                <motion.div
                    animate={{
                        width: loaderBar? "100%" : "0%"
                    }}
                    transition={{
                        duration: 1
                    }}
                id='loader_bar'></motion.div>
                <nav id='login_nav'>
                    <li>
                        <h2>Login</h2>
                    </li>
                    <li>
                        <input type='text' name='email' id='email' className='inputs_login' value={email} onChange={(e) => {setemail(e.target.value)}} placeholder='Email Address' />
                    </li>
                    <li>
                        <input type='password' name='password' id='password' className='inputs_login' value={password} onChange={(e) => {setpassword(e.target.value)}} placeholder='Password' />
                    </li>
                    <li>
                        <select id='inputs_dropdown' onChange={(e) => {setacc(e.target.value)}}>
                            <option default value={null}>Select Account Type</option>
                            <option value='buyer'>Login as Buyer</option>
                            <option value='seller'>Login as Seller</option>
                        </select>
                    </li>
                    <li>
                        <button onClick={loginCredentials}>Login</button>
                    </li>
                    <li>
                        <p id='register_link'>Not registered yet? <Link to='/register' >Register here</Link></p>
                    </li>
                </nav>
            </li>
        </nav>
    </div>
  )
}

export default Login