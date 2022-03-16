import React, {useState, useEffect} from 'react'
import './css/SavedAddresses.css';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { motion } from 'framer-motion';
import { SET_ADDRESSES } from '../../Redux/types/types';

function SavedAddresses() {
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);

  const dispatch = useDispatch();

  const firstName = useSelector(state => state.user_creds.map((name) => name.firstName));
  const middleName = useSelector(state => state.user_creds.map((name) => name.middleName));
  const lastName = useSelector(state => state.user_creds.map((name) => name.lastName));

  const addresses = useSelector(state => state.addresses);

  const [receiver, setreciever] = useState("");
  const [hsno, sethsno] = useState("");
  const [street, setstreet] = useState("");
  const [barangay, setbarangay] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [region, setregion] = useState("");
  const [postal, setpostal] = useState("");

  const [float, setfloat] = useState(true);

  const add_address_btn = () => {
      const receiver_final = receiver == ""? `${lastName}, ${firstName}, ${middleName}` : receiver 
      Axios.post('http://localhost:3001/addAddress', {
        userName: userName,
        houseBldg_No: hsno,
        street: street,
        barangay: barangay,
        city_town: city,
        province: province,
        region: region,
        postalCode: postal,
        receiver: receiver_final
      },{
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        //   console.log(response.data);
        if(response.data.status){
            setreciever("")
            sethsno("");
            setstreet("");
            setbarangay("");
            setcity("");
            setprovince("");
            setregion("");
            setpostal("");
            setfloat(true);
        }
      }).catch((err) => {
          console.log(err);
      })
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/getAddresses/${userName}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
      }).then((response) => {
        dispatch({type: SET_ADDRESSES, addresses: response.data});
        // console.log(addresses);
    }).catch(err => console.log(err));
  }, [userName, addresses])
  

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
                     <p className='p_tagger_add'>Name of Reciever</p><input type='text' value={receiver} onChange={(e) => {setreciever(e.target.value)}} className='inputs_add' name='fullName' placeholder={`${lastName}, ${firstName}, ${middleName}`} />
                 </li>
                 <li>
                     <p className='p_tagger_add'>House / Bulding No.</p><input type='text' value={hsno} onChange={(e) => {sethsno(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: 1121' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Street</p><input type='text' value={street} onChange={(e) => {setstreet(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: Kalayaan Street' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Barangay</p><input type='text' value={barangay} onChange={(e) => {setbarangay(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: Commonwealth' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>City / Town</p><input type='text' value={city} onChange={(e) => {setcity(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: Quezon City' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Province</p><input type='text' value={province} onChange={(e) => {setprovince(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: Metro Manila' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Region</p><input type='text' value={region} onChange={(e) => {setregion(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: NCR' />
                 </li>
                 <li>
                     <p className='p_tagger_add'>Postal Code</p><input type='text' value={postal} onChange={(e) => {setpostal(e.target.value)}} className='inputs_add' name='hsno' placeholder='Example: 9015' />
                 </li>
                 <li>
                     <button id='conf_btn' onClick={add_address_btn}>Confirm Address</button>
                 </li>
             </ul>
         </motion.div>
         <ul id='ul_profilemain'>
            <li>
                <button id='add_btn' onClick={() => setfloat(!float)}>Add Address</button>
            </li>
            <li>
                <h4>Addresses</h4>
            </li>
            <li>
            {addresses.map((adds) => {
                return(
                    <ul id='ul_addresses_res' key={adds.id}>
                      <li>
                          <h4>{adds.receiver}</h4>
                      </li>
                      <li>
                          <span><b>Full Address:</b> {adds.houseBldg_No}, {adds.street} Street, {adds.barangay}, {adds.city_town}</span>
                      </li>
                      <li>
                          <span><b>Province:</b> {adds.province}, {adds.region}</span>
                      </li>
                      <li>
                          <span><b>Postal Code:</b> {adds.postalCode}</span>
                      </li>
                      <li>
                          <p id='status_check' style={{backgroundColor: adds.status == "Default"? "limegreen" : "red"}}>{adds.status} Address</p>
                      </li>
                    </ul>
                )
            })}
            </li>
        </ul>
    </div>
  )
}

export default SavedAddresses