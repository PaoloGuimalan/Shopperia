import React from 'react';
import './css/MessageDashboard.css';

function MessageDashboard() {
  return (
    <div id='div_message_dashboard'>
      <nav id='nav_message'>
        <li id='li_nav_message'>
          <nav id='nav_messages_under'>
            <li>
              <h4 id='message_label'>Messages</h4>
            </li>
            <li>
              <nav id='message_chat'>
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
            <li>
              <nav id='message_chat'>
                <li>
                  <img src={'http://localhost:3001/profileImgs/Default_Male.jpg'} className='img_chat_head' />
                </li>
                <li>
                  <nav className='nav_message_head_class'>
                    <li>
                      <h4 id='username_label'>UserTwoName | UserID_123456</h4>
                    </li>
                    <li>
                      <p>I am really Sorry!</p>
                    </li>
                  </nav>
                </li>
              </nav>
            </li>
          </nav>
        </li>
        <li id='li_nav_message_sec'>
          Hello
        </li>
      </nav>
    </div>
  )
}

export default MessageDashboard