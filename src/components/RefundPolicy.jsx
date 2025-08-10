import React from "react";
import "../styles/Mission.css";

function RefundPolicy() {
  return (
    <div className="mission-section">
      <div className="mission-text">
        <h2>Refund Policy</h2>
        <article>
          At SarvarthaSiddhi Foundation, we are grateful for your support and
          contributions. Donations help us continue our mission and make a
          positive impact. Since donations are voluntary and used immediately
          for ongoing programs, we generally do not offer refunds. However, we
          understand mistakes can happen and will consider refund requests in
          the following situations: 
          <ol><ul>Duplicate Payment – If you accidentally made
          a duplicate donation.</ul>
          <ul>Unauthorized Transaction – If your payment
          method was used without your consent.</ul></ol>
          How to Request a Refund: <br/>
          Email us at sarvarthasiddhifoundation@gmail.com within 1 day of the
          donation. Include your name, transaction details, and reason for the
          refund request. <br/>Refunds,if approved it will be processed and credited
          back to your original payment method within 7–10 business days.
        </article>
      </div>
    </div>
  );
}

export default RefundPolicy;
