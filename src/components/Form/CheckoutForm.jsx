import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ closeModal, bookingInfo }) => {
  //   console.log(bookingInfo);
  const [clientSecret, setClientSecret] = useState("");
  console.log(clientSecret);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (bookingInfo?.price > 1) {
      getClientSecret({ price: bookingInfo?.price });
    }
  }, [bookingInfo?.price]);

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-checkout-session`, price);
    console.log("data", data.clientSecret);
    setClientSecret(data?.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <div className="flex mt-2 justify-around">
        <button
          disabled={!stripe}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Pay ${bookingInfo?.price}
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
