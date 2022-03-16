import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './css/Register.css';
import { motion } from 'framer-motion';

const SellerInputs = ({setmessageAlert, setalertcontentresult, setalertcontent}) => {
    const [shop, setshop] = useState("");

    const [selleremail, setselleremail] = useState("");
    const [sellerconfemail, setsellerconfemail] = useState("");
    const [sellerpassword, setsellerpassword] = useState("");

    const [sellerfirstName, setsellerfirstName] = useState("");
    const [sellermiddleName, setsellermiddleName] = useState("");
    const [sellerlastName, setsellerlastName] = useState("");


    const credentialsprompt = (prompt) => {
        // alert("Registered!");
        if(prompt){
            setselleremail("");
            setsellerconfemail("");
            setsellerpassword("");
            setsellerfirstName("");
            setsellermiddleName("");
            setsellerlastName("");
            setshop("");
        }
      }
    
      const createUser = () => {
          if(selleremail != "" && sellerconfemail != ""){
            //   alert("Okay!");
            if(selleremail == sellerconfemail){
                // alert("email same");
                Axios.post('http://localhost:3001/createSeller', {
                    firstName: sellerfirstName,
                    middleName: sellermiddleName,
                    lastName: sellerlastName,
                    shopName: shop,
                    email: selleremail,
                    password: sellerpassword
                }).then((response) => {
                    // console.log(response.data);
                    setalertcontentresult(response.data.status);
                    setmessageAlert(true);
                    setTimeout(() => {
                        setalertcontent(response.data.content);
                    }, 1200)
                    setTimeout(() => {
                        setmessageAlert(false);
                        setalertcontent("");
                        setalertcontentresult(false);
                    }, 5000);
                    credentialsprompt(response.data.status);
                })
                // console.log({
                //     firstName: sellerfirstName,
                //     middleName: sellermiddleName,
                //     lastName: sellerlastName,
                //     shopName: shop,
                //     email: selleremail,
                //     password: sellerpassword
                // })
            }
            else{
                alert("Email not the same!");
            }
          }
          else{
              alert("Type the email again to confirm!");
          }
      }


    return(
        <>
        <li>
            <input type='text' name='shopName' id='shopName' className='inputs_login' placeholder='Shop Name' value={shop} onChange={(e) => {setshop(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='sellerfirstName' id='sellerfirstName' className='inputs_login' placeholder='Seller First Name' value={sellerfirstName} onChange={(e) => {setsellerfirstName(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='sellermiddleName' id='sellermiddleName' className='inputs_login' placeholder='Seller Middle Name (Optional)' value={sellermiddleName} onChange={(e) => {setsellermiddleName(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='sellerlastName' id='sellerlastName' className='inputs_login' placeholder='Seller Last Name' value={sellerlastName} onChange={(e) => {setsellerlastName(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='selleremail' id='selleremail' className='inputs_login' placeholder='Email Address' value={selleremail} onChange={(e) => {setselleremail(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='selleremail' id='sellerconfirm_email' className='inputs_login' value={sellerconfemail} onChange={(e) => {setsellerconfemail(e.target.value)}} placeholder='Confirm Email Address' />
        </li>
        <li>
            <input type='password' name='sellerpassword' id='sellerpassword' className='inputs_login' value={sellerpassword} onChange={(e) => {setsellerpassword(e.target.value)}} placeholder='Password' />
        </li>
        <li>
            <button onClick={createUser}>Register</button>
        </li>
        </>
      )
  }


  const UserInputs = ({setmessageAlert, setalertcontentresult, setalertcontent}) => {

    const [email, setemail] = useState("");
    const [confemail, setconfemail] = useState("");
    const [password, setpassword] = useState("");

    const [firstName, setfirstName] = useState("");
    const [middleName, setmiddleName] = useState("");
    const [lastName, setlastName] = useState("");

    const [age, setage] = useState("");
    const [gender, setgender] = useState("");

    const credentialsprompt = (prompt) => {
        // alert("Registered!");
        if(prompt){
            setemail("");
            setconfemail("");
            setpassword("");
            setfirstName("");
            setmiddleName("");
            setlastName("");
            setage("");
        }
      }
    
      const createUser = () => {
          if(email != "" && confemail != ""){
            //   alert("Okay!");
            if(email == confemail){
                // alert("email same");
                Axios.post('http://localhost:3001/createUser', {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                    email: email,
                    password: password
                }).then((response) => {
                    // console.log(response.data);
                    setalertcontentresult(response.data.status);
                    setmessageAlert(true);
                    setTimeout(() => {
                        setalertcontent(response.data.content);
                    }, 1200)
                    setTimeout(() => {
                        setmessageAlert(false);
                        setalertcontent("");
                        setalertcontentresult(false);
                    }, 5000);
                    credentialsprompt(response.data.status);
                })
                // console.log({
                //     firstName: firstName,
                //     middleName: middleName,
                //     lastName: lastName,
                //     age: age,
                //     email: email,
                //     password: password
                // })
            }
            else{
                alert("Email not the same!");
            }
          }
          else{
              alert("Type the email again to confirm!");
          }
      }

    return(
        <>
        <li>
            <input type='text' name='firstName' id='firstName' className='inputs_login' placeholder='First Name' value={firstName} onChange={(e) => {setfirstName(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='middleName' id='middleName' className='inputs_login' placeholder='Middle Name (Optional)' value={middleName} onChange={(e) => {setmiddleName(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='lastName' id='lastName' className='inputs_login' placeholder='Last Name' value={lastName} onChange={(e) => {setlastName(e.target.value)}} />
        </li>
        <li>
            <input type='number' name='age' id='age' className='inputs_login' placeholder='Age' value={age} onChange={(e) => {setage(e.target.value)}} />
        </li>
        <li>
            <select id='inputs_dropdown' onChange={(e) => {setgender(e.target.value)}}>
                <option default value={null}>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
            </select>
        </li>
        <li>
            <input type='text' name='email' id='email' className='inputs_login' placeholder='Email Address' value={email} onChange={(e) => {setemail(e.target.value)}} />
        </li>
        <li>
            <input type='text' name='email' id='confirm_email' className='inputs_login' value={confemail} onChange={(e) => {setconfemail(e.target.value)}} placeholder='Confirm Email Address' />
        </li>
        <li>
            <input type='password' name='password' id='password' className='inputs_login' value={password} onChange={(e) => {setpassword(e.target.value)}} placeholder='Password' />
        </li>
        <li>
            <button onClick={createUser}>Register</button>
        </li>
        </>
      )
  }


function Register() {

  const [acc, setacc] = useState(null)

  const [messageAlert, setmessageAlert] = useState(false);
  const [alertcontentresult, setalertcontentresult] = useState(false);
  const [alertcontent, setalertcontent] = useState("")

  //Seller

  const UserSetup = () => {
      if(acc == "buyer"){
         return <UserInputs setmessageAlert={setmessageAlert} setalertcontentresult={setalertcontentresult} setalertcontent={setalertcontent} />
      }
      else if(acc == "seller"){
          return <SellerInputs setmessageAlert={setmessageAlert} setalertcontentresult={setalertcontentresult} setalertcontent={setalertcontent} />
      }
      else{
          return(
            <p>Select an Account Type</p>
          )
      }
  }

  return (
    <div>
        <motion.div id='alert_prompts'
            animate={{
                width: messageAlert? "200px" : "0px",
                backgroundColor: alertcontentresult? "lime" : "red"
            }}
            transition={{
                delay: messageAlert? 1 : 1
            }}
        >
            <motion.p
                animate={{
                    opacity: 1
                }}

                transition={{
                    delay: 1.2
                }}
             id='alert_label'>{alertcontent}</motion.p>
        </motion.div>
        <nav id='login_nav'>
            <li>
                <h2>Register</h2>
            </li>
            <li>
                <select id='inputs_dropdown' onChange={(e) => {setacc(e.target.value)}}>
                    <option default value={null}>Select Account Type</option>
                    <option value='buyer'>Buyer</option>
                    <option value='seller'>Seller</option>
                </select>
            </li>
            <UserSetup />
            <li>
                <p id='register_link'>Already have an account? <Link to='/login' >Log In here</Link></p>
            </li>
        </nav>
    </div>
  )
}

export default Register