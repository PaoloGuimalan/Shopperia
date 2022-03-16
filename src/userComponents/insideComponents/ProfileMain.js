import React, {useState, useEffect} from 'react'
import './css/ProfileMain.css'
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

function ProfileMain() {
  const userName = useSelector(state => state.userID);
  const user_creds = useSelector(state => state.user_creds);

  const [prpic, setprpic] = useState();

  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");

  const uploader = () => {
    //   console.log(prpic);
    const formimg = new FormData();
    formimg.append('prpic', prpic);
    formimg.append('userName', userName);

    Axios.post('http://localhost:3001/prpicChange', formimg, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": 'multipart/form-data'
        },
      }).then((response) => {
          if(response.data.status){
            setprpic(null);
            document.getElementById("prpic").files = null;
            document.getElementById("prpic").value = null;
          }
      }).catch((err) => {
          console.log(err);
      })
  }

  return (
    <div id='div_profilemain'>
        <ul id='ul_profilemain'>
            <li>
                <h4>Change Profile Picture</h4>
            </li>
            <li>
                <input type='file' name='prpic' id='prpic' onChange={(e) => {setprpic(e.target.files[0])}} />
                <button disabled={prpic != null? false:true} onClick={uploader}>Upload Picture</button>
            </li>
            <li>
                <h4>Full Name</h4>
            </li>
            <li>
                {user_creds.map((names) => {
                    return(
                        <>
                            <input type='text' onChange={(e) => {setfirstName(e.target.value)}} value={firstName} className='input_names'name='firstName' placeholder={`Your First Name: ${names.firstName}`}/><br />
                            <input type='text' onChange={(e) => {setmiddleName(e.target.value)}} value={middleName} className='input_names' name='middleName' placeholder={`Your Middle Name: ${names.middleName}`}/><br />
                            <input type='text' onChange={(e) => {setlastName(e.target.value)}} value={lastName} className='input_names' name='lastName' placeholder={`Your Last Name: ${names.lastName}`}/><br />
                            <button id='btn_names_submit' disabled={firstName != "" && lastName != ""? false:true} >Update Account Name</button>
                        </>
                    )
                })}
            </li>
        </ul>
    </div>
  )
}

export default ProfileMain