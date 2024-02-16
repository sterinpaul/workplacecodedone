import{ useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../../../API/apiUserConnection";

const CheckoutForm = (props) => {
  const navigate = useNavigate()

  const { formValues, planValue } = props;

// console.log("....userDetails",formValues,planValue);
    const stripe = useStripe();
    const elements = useElements();
  
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        console.log("................");
        return;
      }
  
      setIsLoading(true);
  
      // const { error } = await stripe.confirmPayment({
        const response = await stripe.confirmPayment({

        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000",
        },
      });


      //this code is temporary
      if(response){
        const response = await saveUser(formValues,planValue)
        if(response){
          console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeresponse",response);
          navigate("/paymentsuccess")
        }
        // console.log(",,,,,,,,,nnnnnnnnnnnnnnnnnnnnn",planValue);
      }
  console.log("response......................",response);



      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      
      
      if (response?.error.type === "card_error" || response?.error.type === "validation_error") {
        setMessage(response?.error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    };
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  
    return (
      <form id="payment-form" onSubmit={handleSubmit} className="formStripe">
  
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="buttenstripe">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="payment-message">{message}</div>}
      </form>
    );

    }
   // Prop types definition
CheckoutForm.propTypes = {
  formValues: PropTypes.object,
  planValue: PropTypes.object,
 
};

export default CheckoutForm;
