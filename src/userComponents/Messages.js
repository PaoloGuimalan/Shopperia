import React, { useState, useEffect } from 'react'
import './css/Messages.css';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_CHAT_BOX, USER_MESSAGE_LIST } from '../Redux/types/types.js'
import Axios from 'axios';

function Messages() {

  const userName = useSelector(state => state.userID);
  const messagelist = useSelector(state => state.messagelist);
  const messageInbox = useSelector(state => state.messageInbox);
  const statuschatbox = useSelector(state => state.chatboxstatus);
  const dispatch = useDispatch();

  const chatBox = (open, user, conversation_id) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: user, conversation_id: conversation_id}});
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/messages/${userName}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      dispatch({type: USER_MESSAGE_LIST, messagelist: response.data});
    }).catch((err) => console.log(err));
  }, [messagelist, userName])
  

  return (
    <div id='div_messages'>
        <nav id='nav_messages'>
            <li>
                <h4 id='messages_label'>Messages</h4>
            </li>
            <li>
                <div id='div_input'>
                    <span id='span_input'><input type='text' name='search_messages' id='input_messages_search'/></span>
                    <span id='span_btn'><button id='btn_message_search'><SearchIcon style={{fontSize: "17px"}} /></button></span>
                </div>
            </li>
            {messagelist.length > 0? messagelist.map((messages) => {
              return(
                <li className='li_message_chat_user' onClick={() => chatBox(true, messages.from == userName? messages.to : messages.from, messages.conversation_id)}>
                  <nav id='message_chat_user'>
                    <li>
                      <img src={'http://localhost:3001/profileImgs/Default_Male.jpg'} className='img_chat_head' />
                    </li>
                    <li>
                      <nav className='nav_message_head_class'>
                        <li>
                          <h4 id='username_label'>{messages.from == userName? messages.to : messages.from}</h4>
                        </li>
                        <li>
                          <p className='message_content_preview'>{messages.from == userName? `you: ${messages.message_content}` : messages.message_content}</p>
                        </li>
                      </nav>
                    </li>
                  </nav>
                </li>
              )
            }) : (
              <li>
                  <h4 id='no_messages_label'>No Messages</h4>
              </li>
            )}
        </nav>
    </div>
  )
}

export default Messages