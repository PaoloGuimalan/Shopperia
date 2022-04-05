import React, {useState, useEffect} from 'react'
import './css/PaymentMethods.css';
import { motion } from 'framer-motion'
import PayPal from './PayPal';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PAYMENT_ACCOUNTS } from '../../Redux/types/types';
import PayPalIMG from './imgs/paypalimg.png';

function PaymentMethods() {

  const [float, setfloat] = useState(true);
  const [pmdd, setpmdd] = useState("none");

  const [selected, setselected] = useState(false);

  const userName = useSelector(state => state.userID);
  const paymentaccounts = useSelector(state => state.paymentaccounts);
  const dispatch = useDispatch();

  const confirmSelect = () => {
      if(pmdd != "none"){
          setselected(true);
      }
      else{
          setselected(false);
      }
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/paymentaccountslist/${userName}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
        dispatch({type: GET_PAYMENT_ACCOUNTS, paymentaccounts: response.data});
    }).catch((err) => console.log(err));
  }, [paymentaccounts, userName]);

  return (
    <div id='div_pm'>
        <motion.div
         animate={{
            height: float? "0px" : "auto",
            border: float? "none" : "solid 2px",
            borderImage: float? "none" : "linear-gradient(#e10013, #D60789) 1"
          }} 
         id='float_menu'>
             <ul id='ul_add'>
                 <li>
                     <select id='select_account_dd' onChange={(e) => {setpmdd(e.target.value)}}>
                         <option default value='none'>--select account--</option>
                         <option value='PayPal'>PayPal</option>
                     </select>
                 </li>
                 <li>
                    <button onClick={() => confirmSelect()}>Confirm Online Wallet</button>
                 </li>
                 <li>
                     {!selected? <p id='label_none_result'>Select an Account</p> : (
                         <PayPal />
                     )}
                 </li>
             </ul>
         </motion.div>
        <ul id='ul_profilemain'>
            <li>
                <button id='add_btn' onClick={() => {setfloat(!float)}}>Add Method</button>
            </li>
            <li>
                <h4>Payment Informations</h4>
            </li>
            <li>
                {paymentaccounts.map((accounts) => {
                    return(
                        <nav id='div_accounts_return' key={accounts.account_time_added}>
                            <li className='li_one_accounts_return'>
                                <img src={accounts.account_type == "PayPal"? PayPalIMG : "none"} className='img_accounts_return'/>
                            </li>
                            <li className='li_two_accounts_return' style={{ backgroundColor: accounts.account_type == "PayPal" ? "#3b7bbf" : "white" }}>
                                <table className='table_accounts_return'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className='label_account_type'>{accounts.account_type}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='label_account_name'>{accounts.account_name}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='label_account_email'>{accounts.account_email}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className='label_account_address'>{accounts.account_address}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </nav>
                    )
                })}
            </li>
        </ul>
    </div>
  )
}

export default PaymentMethods