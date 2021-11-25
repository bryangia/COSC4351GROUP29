import StripeCheckout from "react-stripe-checkout";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./pay.css";

export default function Pay(props) {
  const { user } = useContext(Context);
  const KEY = process.env.REACT_APP_STRIPE;
  const [stripeToken, setStripeToken] = useState(null);

  let dateTime = new Date(props.dateTime);
  // Stripe method
  const onToken = (token) => {
    setStripeToken(token);
  };

  // API *** Send and Store Payment to database
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createPayment = async (stripeId) => {
    try {
      await axios.post("/payment", {
        userId: user ? user._id : null,
        stripeId: stripeId,
        date: dateTime.toUTCString(),
        table: props.tableName,
      });
      //   console.log(res.data);
      props.payment(true);
    } catch (error) {
      console.log(error);
    }
  };

  // API *** Stripe Payment Checkout
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 1000,
        });
        // console.log(res.data);
        createPayment(res.data.id);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [createPayment, stripeToken]);

  return (
    <div className="payment">
      <span className="paymentNotice">
        *** Due to Weekend Reservation, We need to hold $10 fee. Sorry for this
        Inconvenience ***
      </span>
      <StripeCheckout
        name="Restaurant 4351"
        image="https://avatars.githubusercontent.com/u/78432157?s=400&u=a3542854353b321e90e5f526d6ac7d5b30a702bf&v=4"
        billingAddress
        shippingAddress
        description={`Your Holding Charge is $10`}
        amount={1000}
        token={onToken}
        stripeKey={KEY}
      >
        <button className="paymentButton">PAY NOW</button>
      </StripeCheckout>
      <span className="paymentTitle">
        *** Using This Test Stripe Payment Card ***
      </span>
      <span className="paymentCard">*** 4242 4242 4242 4242 ***</span>
    </div>
  );
}
