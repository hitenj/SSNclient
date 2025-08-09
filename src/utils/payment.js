import { loadRazorpayScript } from "./razorpay";
import axios from "axios";

export const handleRazorpayPayment = async ({ amount, onSuccess, donorDetails }) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay");
    return;
  }

  try {
    // 1. Create Razorpay Order by calling your backend
    const orderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/create-order`, {
      amount: amount * 100, // in paise
    });

    const order = orderResponse.data;

    // 2. Setup Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // live key
      amount: order.amount,
      currency: "INR",
      name: "Sarvarth Siddhi Foundation",
      description: "Donation",
      order_id: order.orderId, // << must be added
      prefill: {
        name: donorDetails.name,
        contact: donorDetails.whatsapp,
      },
      notes: {
        pan: donorDetails.pan,
        city: donorDetails.city,
      },
      theme: { color: "#0f6e40" },
      handler: function (response) {
        if (onSuccess) {
          onSuccess(response); // You already handle saving & redirect there
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    alert("Failed to initiate payment. Please try again.");
  }
};
