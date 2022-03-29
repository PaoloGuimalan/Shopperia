import React from 'react'
import './css/Messages.css';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_CHAT_BOX } from '../Redux/types/types.js'

function Messages() {

  const dispatch = useDispatch();

  const chatBox = (open, user) => {
    dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: user}});
  }

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
            <li className='li_message_chat_user' onClick={() => chatBox(true, "Hanagaki_7021023")}>
              <nav id='message_chat_user'>
                <li>
                  <img src={'http://localhost:3001/profileImgs/Default_Male.jpg'} className='img_chat_head' />
                </li>
                <li>
                  <nav className='nav_message_head_class'>
                    <li>
                      <h4 id='username_label'>UserName | UserID_123456</h4>
                    </li>
                    <li>
                      <p>I am really Sorry!</p>
                    </li>
                  </nav>
                </li>
              </nav>
            </li>
            {/* <li>
                <h4 id='no_messages_label'>No Messages</h4>
            </li> */}
        </nav>
    </div>
  )
}

export default Messages