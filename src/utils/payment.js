import { loadRazorpayScript } from "./razorpay";

export const handleRazorpayPayment = async ({
  amount,
  onSuccess,
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
    name: "Sarvartha Siddhi Foundation",
    description: "Plant a Tree Donation",
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
