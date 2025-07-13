import { loadRazorpayScript } from "./razorpay";

export const handleRazorpayPayment = async ({
  amount,
  onSuccess,
  donorDetails,
}) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Failed to load Razorpay");
    return;
  }

  const options = {
    key: "rzp_test_Z8Y6NJS5MmZIVK",
    amount: amount * 100,
    currency: "INR",
    name: "Sarvarth Siddhi Foundation",
    description: "Donation",
    prefill: {
      name: donorDetails.name,
      contact: donorDetails.whatsapp,
      // email not passed if you removed it
    },
    notes: {
      address: donorDetails.address,
      pan: donorDetails.pan,
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    theme: { color: "#0f6e40" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};