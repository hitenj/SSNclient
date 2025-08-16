import { loadRazorpayScript } from "./razorpay";
import axios from "axios";

export const handleRazorpayPayment = async ({
  amount,
  donorDetails,
  onSuccess,
}) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) return alert("Razorpay SDK failed to load");

  try {
    // create order on server (amount in paise)
    const orderResp = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/payment/create-order`,
      {
        amount: amount * 100,
      }
    );
    const order = orderResp.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sarvarthasiddhi Foundation",
      description: "Donation",
      order_id: order.orderId, // required
      prefill: {
        name: donorDetails.name,
        contact: donorDetails.whatsapp,
      },
      notes: {
        pan: donorDetails.pan || "",
        city: donorDetails.city || "",
      },
      theme: { color: "#0f6e40" },
      // ✅ Desktop flow (popup)
      handler: function (response) {
        if (onSuccess) onSuccess(response);
      },

      // ✅ Mobile flow (redirect)
      callback_url: `${process.env.REACT_APP_API_URL}/api/payment/verify`,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Failed to start payment");
  }
};
