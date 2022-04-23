import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { motion } from 'framer-motion';
import { SET_SAVED_CONTACTS } from '../../Redux/types/types';

function ContactDetails() {

  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);

  const savedcontacts = useSelector(state => state.savedcontacts);

  const dispatch = useDispatch();

  const [float, setfloat] = useState(true);

  const [connumber, setconnumber] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/getsavedcontacts/${userName}`, {
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      dispatch({type: SET_SAVED_CONTACTS, savedcontacts: response.data})
    }).catch((err) => {
      console.log(err);
    })
  }, [userName])
  

  const add_con_btn = () => {
    Axios.post('http://localhost:3001/postSavedAddress', {
      userName: userName,
      connumber: connumber,
      email: email
    },{
      headers:{
        "x-access-token": localStorage.getItem('token')
      }
    }).then((response) => {
      //alert response
      if(response.data.status){
        setconnumber("");
        setemail("");
        setfloat(false);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const setDefaultContact = (id, status) => {
    if(status == "Reserved"){
      Axios.post('http://localhost:3001/setdefaultcon', {
            id: id,
            status: status
        },{
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }).then((response) => {
            //alert response
        }).catch((err) => {
            console.log(err);
        })
    }
  }

  return (
    <div id='div_addresses'>
         <motion.div
         animate={{
            height: float? "0px" : "auto",
            border: float? "none" : "solid 2px",
            borderImage: float? "none" : "linear-gradient(#e10013, #D60789) 1"
          }} 
         id='float_menu'>
             <ul id='ul_add'>
                 <li>
                     <p className='p_tagger_add'>Contact Number</p><input type='text' value={connumber} onChange={(e) => {setconnumber(e.target.value)}} className='inputs_add' name='fullName' placeholder='Example: 09275508232' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Email</p><input type='text' value={email} onChange={(e) => {setemail(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: john@gmail.com' />
                 </li>
                 <li>
                     <button id='conf_btn' onClick={add_con_btn}>Confirm Contact</button>
                 </li>
             </ul>
         </motion.div>
         <ul id='ul_profilemain'>
            <li>
                <button id='add_btn' onClick={() => setfloat(!float)}>Add Contact</button>
            </li>
            <li>
                <h4 id='label_pmethods'>Saved Contacts</h4>
            </li>
            <li>
            {savedcontacts.map((adds) => {
                return(
                    <ul id='ul_addresses_res' key={adds.id}>
                      <li>
                          <h4>{adds.contact_number}</h4>
                      </li>
                      <li>
                          <span>{adds.email}</span>
                      </li>
                      <li>
                          <p id='status_check' title={adds.status != "Default"? "Set as Default" : ""} style={{backgroundColor: adds.status == "Default"? "limegreen" : "red"}} onClick={() => {setDefaultContact(adds.id, adds.status)}} >{adds.status} Contact</p>
                      </li>
                    </ul>
                )
            })}
            </li>
        </ul>
    </div>
  )
}

export default ContactDetails