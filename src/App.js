import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Home from './mainComponents/Home';
import Profile from './userComponents/Profile';
import Dashboard from './sellerComponents/Dashboard';
import { SET_LOGIN, SET_ID, SET_LOGIN_SELLER, SET_ID_SELLER, SET_PRODUCTS } from './Redux/types/types';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Search from '../src/userComponents/Search';
import ProductsView from './userComponents/ProductsView';
import Pocket from './userComponents/Pocket';
import Messages from './userComponents/Messages';
import ShopView from './userComponents/ShopView';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirector = useSelector(state => state.statusLogin);

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
  

  return (
    <div className="App">
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
