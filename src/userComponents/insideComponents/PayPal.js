import React, { useRef, useEffect, useState } from 'react'
import './css/PayPal.css';
import Axios from 'axios';
import { useSelector } from 'react-redux'

function PayPal() {

    const paypal = useRef();
    const userName = useSelector(state => state.userID);
    const [datas, setdatas] = useState(null);

    useEffect(() => {
      // console.log(datas);
      if(datas != null){
        Axios.post("http://localhost:3001/addpaymentaccount", datas ,{
            headers: {
              "x-access-token": localStorage.getItem("token")
          },
        }).then((response) => {
          //asd
        }).catch((err) => {
          console.log(err);
        })
      }
    }, [datas]);

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Log In Fee",
                    amount: {
                      currency_code: "SGD",
                      value: 0.01,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              // console.log(order);
              if(await order.status == "COMPLETED"){
                const given_name = await order.payer.name.given_name;
                const surname = await order.payer.name.surname; 

                const full_name = await `${given_name}, ${surname}`;
                const email = await order.payer.email_address;

                const address = await order.purchase_units[0].shipping.address.address_line_1;
                const address2 = await order.purchase_units[0].shipping.address.admin_area_2;
                const address3 = await order.purchase_units[0].shipping.address.admin_area_1;
                const address4 = await order.purchase_units[0].shipping.address.postal_code;

                const full_address = await `${address}, ${address2}, ${address3}, ${address4}`;

                const create_time = await order.create_time;

                // console.log(full_name);
                // console.log(email);
                // console.log(full_address);
                // console.log(create_time);

                await setdatas({
                    userName: await userName,
                    account_name: await full_name,
                    account_email: await email,
                    account_address: await full_address,
                    account_time_added: await create_time,
                    accountType: "PayPal"
                })

                // console.log(datas);
              }
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
      }, []);
    
      return (
        <div id='paypal_div'>
          <div id='paypal_result' ref={paypal}></div>
        </div>
      )
}

export default PayPal