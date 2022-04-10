import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './css/MessageDashboard.css';
import { SELLER_MESSAGE_INBOX, SELLER_MESSAGE_LIST, USER_MESSAGE_LIST } from '../Redux/types/types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';

function MessageDashboard() {

  const shopID = useSelector(state => state.sellerID.shopID);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLoginSeller);
  const userName = useSelector(state => state.userID);
  const dashstats = useSelector(state => state.dashboardstatus);
  const sellerID = useSelector(state => state.sellerID);
  const sellerinfo = useSelector(state => state.sellerinfo);

  const sellermessagelist = useSelector(state => state.sellermessagelist);
  const sellermessageInbox = useSelector(state => state.sellermessageInbox);

  const { user_id } = useParams();

  const [contentsellermsg, setcontentsellermsg] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/messages/${shopID}`, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      dispatch({type: SELLER_MESSAGE_LIST, sellermessagelist: response.data});
      // console.log(response.data);
    }).catch((err) => console.log(err));
  }, [sellermessagelist ,shopID]);

  useEffect(() => {
    if(user_id != "" || user_id != undefined){
      Axios.get(`http://localhost:3001/messagesInbox/${shopID}/${user_id}`, {
        headers: {
          "x-access-tokenseller": localStorage.getItem("tokenseller")
        },
      }).then((response) => {
        dispatch({type: SELLER_MESSAGE_INBOX, sellermessageInbox: response.data});
      }).catch((err) => {console.log(err)});
    }
  }, [sellermessageInbox, user_id]);

  const sendSellerMsg = () => {
    Axios.post("http://localhost:3001/sendMessage", {
      message_content: contentsellermsg,
      from: shopID,
      to: user_id
    }, {
      headers: {
        "x-access-tokenseller": localStorage.getItem("tokenseller")
      },
    }).then((response) => {
      //response reserve if there is
      if(response.status){
        setcontentsellermsg("");
      }
    }).catch((err) => console.log(err));
  }

  return (
    <div id='div_message_dashboard'>
      <nav id='nav_message'>
        <li id='li_nav_message'>
          <nav id='nav_messages_under'>
            <li>
              <h4 id='message_label'>Messages</h4>
            </li>
            {sellermessagelist.length > 0? sellermessagelist.map((messages) => {
              return(
                <Link className='link_btns_seller_msg_list' to={`/dashboard/messages/${messages.from == shopID? messages.to : messages.from}`}>
                  <li className='li_message_chat_user'>
                    <nav id='message_chat_user'>
                      <li>
                        <img src={'http://localhost:3001/profileImgs/Default_Male.jpg'} className='img_chat_head' />
                      </li>
                      <li>
                        <nav className='nav_message_head_class'>
                          <li>
                            <h4 id='username_label_seller'>{messages.from == shopID? messages.to : messages.from}</h4>
                          </li>
                          <li>
                            <p className='message_content_preview_seller'>{messages.from == shopID? `you: ${messages.message_content}` : messages.message_content}</p>
                          </li>
                        </nav>
                      </li>
                    </nav>
                  </li>
                </Link>
              )
            }) : (
              <li>
                  <h4 id='no_messages_label'>No Messages</h4>
              </li>
            )}
          </nav>
        </li>
        <li id='li_nav_message_sec'>
              {user_id? (
                <nav id='main_nav_chatbox_seller'>
                <li>
                  <nav id='header_chatbox_dash'>
                    <li className='li_header_chatbox_uno'>
                      <p id='chat_label_user' className='dash_li_header'>{user_id}</p>
                    </li>
                    {/* <li className='li_header_chatbox segundo'>
                      <button id='btn_close_chatbox' onClick={() => minimizeChatBox(false, statuschatbox.user)}><MinimizeIcon style={{color: "white"}} /></button>
                    </li>
                    <li className='li_header_chatbox'>
                      <button id='btn_close_chatbox' onClick={() => closeChatBox(false, "")}><CloseIcon style={{color: "white"}} /></button>
                    </li> */}
                  </nav>
                </li>
                <li id='li_content_manager_seller'>
                  {sellermessageInbox.length > 0? sellermessageInbox.map((inbox) => {
                    return(
                      <p className={`content_messages ${inbox.from == shopID? "me" : "sender"}`}>{inbox.message_content}</p>
                    )
                  }) : (
                      <p>No Chats Yet</p>
                  )}
                </li>
                <li id='li_input_manager'>
                  <div id='div_send'>
                    <input type='text' name='msg_content' id='msg_content' value={contentsellermsg} onChange={(e) => {setcontentsellermsg(e.target.value)}} />
                    <button id='btn_send_msg' onClick={() => sendSellerMsg()}><SendIcon style={{fontSize: "20px", color: "white", cursor: "pointer"}} /></button>
                  </div>
                </li>
              </nav>
              ):(
                <div id='div_background_drop'></div>
              )}
        </li>
      </nav>
    </div>
  )
}

export default MessageDashboard