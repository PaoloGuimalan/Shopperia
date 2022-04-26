import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './css/ViewOrder.css';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ORDER_VIEW, TOGGLE_CHAT_BOX } from '../../Redux/types/types';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, DirectionsRenderer } from 'react-google-maps';
import Circle from 'react-google-maps/lib/components/Circle';
import PersonMarker from '../marker/person_marker.png';
import { motion } from 'framer-motion';

function Map(){

    const [lat, setlat] = useState(0);
    const [long, setlong] = useState(0);

    const [latlangsetter, setlatlangsetter] = useState({lat: "", lng: "" });
    const [directions, setdirections] = useState({directions: ""});

    useEffect(() => {
        navigator.geolocation.watchPosition((position)=> {
            const p=position.coords;
            // console.log(p.latitude,p.longitude);
            setlat(p.latitude);
            setlong(p.longitude);
        }, (err) => {
            //alert error
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1})
    }, [lat, long])

    const google = window.google;
    
    useEffect(() => {
        
    }, [])

    const clicker = (ev) => {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: { lat: lat, lng: long }, 
          destination: {lat: ev.latLng.lat(), lng: ev.latLng.lng()}, 
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // setdirections({directions: result})
            console.log(result);
          } else {
            console.error(result);
          }
        });
    }

    return(
        <>
            {lat != 0 && long != 0? (
                <GoogleMap 
                    defaultZoom={15} 
                    defaultCenter={{ lat: lat, lng: long }} 
                    onClick={(ev) => {
                        setlatlangsetter({lat: ev.latLng.lat(), lng: ev.latLng.lng()})
                        // clicker(ev);
                    }}
                >
                    {latlangsetter.lat != "" && latlangsetter.lng != ""? (
                        <>
                            <Marker position={latlangsetter} title='Pinned Location' onClick={() => {setlatlangsetter({lat: "", lng: ""})}}/>
                            <Circle center={latlangsetter} radius={20} />
                        </>
                    ) : ""}
                    <Marker 
                    icon={{
                        url: PersonMarker,
                        anchor: new google.maps.Point(17, 46),
                        scaledSize: new google.maps.Size(60, 70),
                    }}  
                    position={{ lat: lat, lng: long }} title='Your Location' />
                </GoogleMap>
            ) : ""}
        </>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function ViewOrder() {

  const { order_id } = useParams();
  const userName = useSelector(state => state.userID);

  const orderview = useSelector(state => state.orderview);
  const dispatch = useDispatch();

  const [ratingToggle, setratingToggle] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getviewOrderDetails/${order_id}`, {
        headers:{
            "x-access-token": localStorage.getItem('token')
        }
    }).then((response) => {
        dispatch({type: SET_ORDER_VIEW, orderview: response.data});
    }).catch((err) => {
        console.log(err);
    })
  }, [order_id]);

  const chatBoxSupport = (open) => {
    Axios.get(`http://localhost:3001/chatSupportMessageList/${userName}`, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then(async (response) => {
      // alert(await response.data.employeeID)
      // console.log(response.data);
      dispatch({type: TOGGLE_CHAT_BOX, status: {open: open, user: response.data.map((id) => id.employeeID)}});
    }).catch((err) => console.log(err));
  }

  const setRate = () => {
    setratingToggle(!ratingToggle);
  }

  return (
    <div id='div_viewOrder'>
       <h3>Order View</h3>
       {orderview.map((dets) => {
           return(
               <nav key={`${dets.order_id}${dets.rider_id}${dets.date_made}`} id='viewOrder_mainNav'>
                   <li>
                        <nav id='nav_viewOrder'>
                            <li>
                                    <img src={dets.var_img} id='img_prev_viewOrder' />
                            </li>
                            <li>
                                    <table id='table_viewOrder'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3>{dets.order_id}</h3>
                                                    <p id='shopLabel'>{dets.shopname} | {dets.shopAddress}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4>Shipping Address</h4>
                                                    <p id='shopLabel'>{dets.fulladdress}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span><p className={`status_label ${dets.status}`}>{dets.status} - {dets.remarks}</p></span>
                                                    <span><p>Date Made: {dets.date_ordered}</p></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </li>
                        </nav>
                   </li>
                   <li>
                       <nav id='second_nav_viewOrder'>
                           <li>
                                <h4 id='label_payment'>Payment Details</h4>
                           </li>
                           <li>
                               <table id='table_viewOrder_two'>
                                   <tbody>
                                       <tr>
                                           <td>
                                               <nav id='payment_nav_mini'>
                                                   <li>
                                                        <p>Method Used: {dets.payment_method}</p>
                                                        <p>Status: {dets.payment_status == 'not_paid'? "Not Paid Yet" : "Paid"}</p>
                                                   </li>
                                                   <li>
                                                        <p>Quantity: {dets.variety}</p>
                                                        <p id='payment_label_total'>Total Payment: &#8369;{dets.order_total}</p>
                                                   </li>
                                               </nav>
                                           </td>
                                       </tr>
                                   </tbody>
                               </table>
                           </li>
                       </nav>
                   </li>
                   {dets.status == "Received"? (
                        <li>
                            <h4>Are you satisified with our service? Rate or leave a feedback.</h4>
                            <nav id='delivery_nav_rec'>
                                <li>
                                    <table id='tbl_id_refund'>
                                        <tbody>
                                            <tr>
                                                <motion.td>
                                                    <motion.table id='tbl_id_textarea'
                                                        animate={{
                                                            height: ratingToggle? "0px" : "auto"
                                                        }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <textarea id='textarea_feedback'></textarea>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <button id='btn_submit_feedback'>Submit</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </motion.table>
                                                </motion.td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button className='btn_refund' onClick={() => {setRate()}}>{ratingToggle? "Cancel" : "Rate"}</button>
                                                    <button className='btn_refund'onClick={() => chatBoxSupport(true)}>Chat Support</button>
                                                    <button className='btn_refund'>Request Refund</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </nav>
                        </li>
                   ) : ""}
                   {dets.remarks == "Out for Delivery"? (
                        <li>
                            <nav id='delivery_nav'>
                                <li>
                                    <h4 id='label_payment'>Delivery Details</h4>
                                </li>
                                <li>
                                    <table id='table_viewOrder_two'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p>Rider Name: <b>{dets.rider_fullName}</b></p>
                                                    <p>Rider ID: <b>{dets.rider_id}</b></p>
                                                    <h4 id='label_payment'>Rider Live Location</h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li style={{height: "500px", width: "100%"}}>
                                    <WrappedMap 
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAeogbvkQJHv5Xm0Ph_O_ehNWBxkdr_1CU`}
                                        loadingElement={<div style={{height: '100%'}} />}
                                        containerElement={<div style={{height: '100%'}} />}
                                        mapElement={<div style={{height: '100%'}} />}
                                    />
                                </li>
                            </nav>
                        </li>
                   ) : ""}
               </nav>
           )
       })}
    </div>
  )
}

export default ViewOrder