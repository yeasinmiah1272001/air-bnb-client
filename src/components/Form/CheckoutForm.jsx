import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";

const CheckoutForm = ({ closeModal, bookingInfo }) => {
  //   console.log(bookingInfo);
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  // console.log(clientSecret);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // fetch client secret
    if (bookingInfo?.price && bookingInfo?.price > 1) {
      getClientSecret({ price: bookingInfo?.price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingInfo?.price]);

  //   get clientSecret
  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    console.log("clientSecret from server--->", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    setProcessing(true);
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
      console.error("[error]", error.message);
      setCardError(error);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      console.log(error);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      //1 create payment info obk
      const paymentInfo = {
        ...bookingInfo,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      console.log(paymentIntent);
      console.log("payment info", paymentInfo);
      setProcessing(false);
      //2 save payment intent booking db
      //3 status room db
    }
  };

  return (
    <>
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
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 size={24} className="animate-spin m-auto" />
            ) : (
              <span>Pay ${bookingInfo?.price}</span>
            )}
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
      {cardError && <p className="text-red-400">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
