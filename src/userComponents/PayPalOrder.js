import React, { useRef, useEffect, useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux'

function PayPalOrder({dataOrder}) {

  const paypal = useRef();
  const userName = useSelector(state => state.userID);
  const order_final = dataOrder.order_total * 0.026;

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: dataOrder.product_id,
                amount: {
                  currency_code: "SGD",
                  value: order_final,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // console.log(order);
          if(order.status == "COMPLETED"){
            Axios.post("http://localhost:3001/postorder", {
                ...dataOrder
            } , {
                headers: {
                  "x-access-token": localStorage.getItem("token")
                },
              }).then((response) => {
                //reserve
              }).catch((err) => console.log(err));
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

export default PayPalOrder