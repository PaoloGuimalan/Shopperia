import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Home from './mainComponents/Home';
import Profile from './userComponents/Profile';
import Dashboard from './sellerComponents/Dashboard';
import { SET_LOGIN, SET_ID, SET_LOGIN_SELLER, SET_ID_SELLER, SET_PRODUCTS, TOGGLE_CHAT_BOX, MINIMIZE_CHAT_BOX, USER_MESSAGE_INBOX } from './Redux/types/types';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Search from '../src/userComponents/Search';
import ProductsView from './userComponents/ProductsView';
import Pocket from './userComponents/Pocket';
import Messages from './userComponents/Messages';
import ShopView from './userComponents/ShopView';
import { motion } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import SendIcon from '@material-ui/icons/Send';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statuschatbox = useSelector(state => state.chatboxstatus);
  const messageInbox = useSelector(state => state.messageInbox);
  const minimizestatebox = useSelector(state => state.minimizestate);
  const userName = useSelector(state => state.userID);
  const redirector = useSelector(state => state.statusLogin);

  const [contentmsg, setcontentmsg] = useState("");

  useEffect(() => {
    // if(redirector == false){
    //   navigate("/login");
    // }
    // navigate("/home");
    // console.log(location.pathname);
    // console.log(redirector);
    if(location.pathname == "/")
    {
      navigate("/home");
    }
  }, [redirector])

  useEffect(() => {
    if(statuschatbox.user != ""){
      Axios.get(`http://localhost:3001/messagesInbox/${userName}/${statuschatbox.user}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        dispatch({type: USER_MESSAGE_INBOX, messageInbox: response.data});
      }).catch((err) => {console.log(err)});
    }
  }, [messageInbox, statuschatbox.user]);

  const buyerGetter = () => {
    Axios.get("http://localhost:3001/loginsession", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        // console.log(response.data);
        if(response.data.status){
          dispatch({type: SET_LOGIN, loginstatus: response.data.status});
          dispatch({type: SET_ID, userID: response.data.userName});
        }
        else{
          dispatch({type: SET_LOGIN, loginstatus: response.data.status});
        }
      })
  }

  const sellerGetter = () => {
    Axios.get("http://localhost:3001/loginsession", {
        headers: {
          "x-access-tokenseller": localStorage.getItem("tokenseller")
        },
      }).then((response) => {
        // console.log(response.data);
        if(response.data.status){
          dispatch({type: SET_LOGIN_SELLER, loginstatusseller: response.data.status});
          dispatch({type: SET_ID_SELLER, sellerID: response.data.userName});
        }
        else{
          dispatch({type: SET_LOGIN, loginstatus: response.data.status});
        }
      })
  }

  useEffect(() => {
    if((localStorage.getItem("token") != null || localStorage.getItem("token") != "") && (localStorage.getItem("tokenseller") == null || localStorage.getItem("tokenseller") == "")){
      buyerGetter();
    }
    else if((localStorage.getItem("token") == null || localStorage.getItem("token") == "") && (localStorage.getItem("tokenseller") != null || localStorage.getItem("tokenseller") != "")){
      sellerGetter();
    }
    else if((localStorage.getItem("token") != null || localStorage.getItem("token") != "") && (localStorage.getItem("tokenseller") != null || localStorage.getItem("tokenseller") != "")){
      buyerGetter();
      sellerGetter();
    }
    // console.log(localStorage.getItem("sjh"))
  }, []);

  const closeChatBox = (open, user) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: user}});
  }

  const minimizeChatBox = (minimize, user) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: minimize, user: user}});
    dispatch({type: MINIMIZE_CHAT_BOX, minimizestate: !minimizestatebox});
  }

  const openMinimizedChatBox = (minimize, user) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: minimize, user: user}});
  }

  const sendMessage = () => {
    Axios.post("http://localhost:3001/sendMessage", {
      message_content: contentmsg,
      from: userName,
      to: statuschatbox.user
    }, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      //response reserve if there is
      if(response.status){
        setcontentmsg("");
      }
    }).catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <motion.div id='chat_head_icon' onClick={() => {openMinimizedChatBox(true, statuschatbox.user)}}
      animate={{
        display: statuschatbox.open? "none" : statuschatbox.user == ""? "none" : "block"
      }}
      whileHover={{
        scale: 1.1
      }}
      >
        <img src='http://localhost:3001/shopImgs/Default_Shop.jpg' id='img_chat_head' />
      </motion.div>
      <motion.div id='chat_box_div'
        drag
        animate={{
          height: statuschatbox.open? "400px" : "0px"
        }}
        >
          <nav id='main_nav_chatbox'>
            <li>
              <nav id='header_chatbox'>
                <li className='li_header_chatbox'>
                  <p>{statuschatbox.user}</p>
                </li>
                <li className='li_header_chatbox'>
                  <button id='btn_close_chatbox' onClick={() => minimizeChatBox(false, statuschatbox.user)}><MinimizeIcon style={{color: "white"}} /></button>
                </li>
                <li className='li_header_chatbox'>
                  <button id='btn_close_chatbox' onClick={() => closeChatBox(false, "")}><CloseIcon style={{color: "white"}} /></button>
                </li>
              </nav>
            </li>
            <li id='li_content_manager'>
              {messageInbox.length > 0? messageInbox.map((inbox) => {
                return(
                  <p className={`content_messages ${inbox.from == userName? "me" : "sender"}`}>{inbox.message_content}</p>
                )
              }) : (
                  <p>No Chats Yet</p>
              )}
            </li>
            <li id='li_input_manager'>
              <div id='div_send'>
                <input type='text' name='msg_content' id='msg_content' value={contentmsg} onChange={(e) => {setcontentmsg(e.target.value)}} />
                <button id='btn_send_msg' onClick={() => {sendMessage()}}><SendIcon style={{fontSize: "20px", color: "white", cursor: "pointer"}} /></button>
              </div>
            </li>
          </nav>
      </motion.div>
      <Routes>
        <Route path='/'  />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home/*' element={<Home />} />
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/search/:query' element={<Search/>} />
        <Route path='/productsView/:queryID' element={<ProductsView />} />
        <Route path='/shopview/:shopID' element={<ShopView />} />
      </Routes>
    </div>
  );
}

export default App;
