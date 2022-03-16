import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import { SET_LOGIN, SET_ID, SET_USER_CREDS } from '../Redux/types/types'
import './css/Profile.css';
import SavedAddresses from './insideComponents/SavedAddresses';
import ContactDetails from './insideComponents/ContactDetails';
import ProfileMain from './insideComponents/ProfileMain';

function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);

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
        // navigate("/profile");
      }
      else{
        dispatch({type: SET_LOGIN, loginstatus: response.data.status});
        navigate("/login");
      }
    })
  }, [redirector, userName]);

  useEffect(() => {
    if(userName != ""){
      Axios.get(`http://localhost:3001/usercreds/${userName}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        dispatch({type: SET_USER_CREDS, user_creds: response.data});
        // console.log(user_creds);
      }).catch(err => console.log(err));
    }
  }, [userName, user_creds]);

  const logoutbtn = () => {
    dispatch({type: SET_LOGIN, loginstatus: false});
    dispatch({type: SET_ID, userID: ""});
    navigate("/home");
    localStorage.removeItem("token");
  }

  return (
    <div id='prfff_div'>
        <nav id='nav_prfff'>
          <li id='li_creds'>
            <nav>
            {user_creds.map((creds) => {
                    return(
                      <>
                        <li className='li_creds' key={creds.userName}>
                          <img src={creds.profile_pic} id='img_prof'/>
                        </li>
                        <li className='li_creds' key={creds.email}>
                          <p id='label_username_prfff'>{creds.userName}</p>
                        </li>
                      </>
                    )
                  })}
              <li>
                <Link className='links des_links' to='/profile'><button className='btns_prfff'>Profile</button></Link>
              </li>
              <li>
                <Link className='links des_links' to='/pocket/cart'><button className='btns_prfff'>Cart</button></Link>
              </li>
              <li>
                <Link className='links des_links' to='/profile/contactdetails'><button className='btns_prfff'>Contact Details</button></Link>
              </li>
              <li>
                <Link className='links des_links' to='/profile/addresses'><button className='btns_prfff'>Saved Addresses</button></Link>
              </li>
              <li>
                <Link className='links des_links' to='/home'><button className='btns_prfff'>Back</button></Link>
              </li>
              <li>
                <button onClick={logoutbtn} className='lgt_btn'>Logout</button>
              </li>
            </nav>
          </li>
          <li id='li_creds_two'>
            <Routes>
              <Route path='/' element={<ProfileMain />}/>
              <Route path='/addresses' element={<SavedAddresses />}/>
              <Route path='/contactdetails' element={<ContactDetails />}/>
            </Routes>
          </li>
        </nav>
      </div>
  )
}

export default Profile