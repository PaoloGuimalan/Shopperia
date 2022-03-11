import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './css/Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SEARCH } from '../Redux/types/types';
import ArrowBack from '@material-ui/icons/KeyboardArrowLeft';

function Search() {

  const { query } = useParams();
  const queryunpack = query.split("%").join(" ");

  const searchvalue = useSelector(state => state.searchvalue);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchbtnTrigger_sec = () => {
    const searchUrl = searchvalue.split(" ").join("%")
    navigate(`/search/${searchUrl}`);
  }

  return (
    <div id='div_search'>
        <nav className='nav_search'>
            <li className='li_home'>
              <button id='btn_back' onClick={() => {navigate("/home")}}><ArrowBack /></button>
            </li>
            <li className='li_home searchbar'>
              <div id='div_search_form'>
                <input type='text' name='search' id='search' onChange={(e) => {dispatch({type: SET_SEARCH, searchstate: e.target.value})}} value={searchvalue} placeholder='Search for a Product Name, Code, Category and Brands' />
                <button id='btn_search' onClick={searchbtnTrigger_sec} disabled={searchvalue == ""? true : false}><SearchIcon /></button>
              </div>
            </li>
            <li className='li_home search_label'>
                <h3 id='label_searchval'>Searched for: "{queryunpack}"</h3>
            </li>
        </nav>
    </div>
  )
}

export default Search