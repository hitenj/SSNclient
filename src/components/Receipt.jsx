import React from "react";
import "../styles/Receipt.css";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import html2pdf from "html2pdf.js";

function Receipt() {
  const location = useLocation();

  let donorDetails, paymentDetails;

  if (location.state) {
    donorDetails = location.state.donorDetails;
    paymentDetails = location.state.paymentDetails;
  } else {
    donorDetails = null;
    paymentDetails = null;
  }

  if (!donorDetails || !paymentDetails) {
    return <p>No receipt data found. Please complete a donation first.</p>;
  }

  // Generate receipt number
  const receiptNumber = generateReceiptNumber();

  // Safely parse amount
  const rawAmount = donorDetails?.amount;
  const amountValue =
    rawAmount !== undefined &&
    rawAmount !== null &&
    rawAmount !== "" &&
    !isNaN(Number(rawAmount))
      ? parseFloat(rawAmount)
      : 0;

  const amountInWords =
    amountValue > 0
      ? convertAmountToWords(Math.round(amountValue))
      : "Zero Rupees Only";

  // Transaction ID if available
  let transactionId = "-";
  if (paymentDetails.acquirer_data) {
    transactionId =
      paymentDetails.acquirer_data.upi_transaction_id ||
      paymentDetails.acquirer_data.arn ||
      "-";
  }

  const handleDownload = () => {
  const element = document.querySelector(".receipt");
  const opt = {
    margin:       0.3,
    filename:     `Receipt-${receiptNumber}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
};

  return (
    <>
      <div className="receipt">
        <div className="header">
          <img
            src={logo}
            alt="Sarvarthasiddhi Foundation Logo"
            className="logo-image"
          />
          <div className="header-text">
            <div className="org-name">Sarvarthasiddhi Foundation</div>
            <div className="tagline">LIVE AND LET LIVE</div>
          </div>
        </div>

        <div className="receipt-title">DONATION RECEIPT</div>

        <div className="section">
          <div className="section-title">Donor Information</div>
          <div className="inline-pair">
            <div className="label">Receipt No:</div>
            <div className="value">{receiptNumber}</div>
            <div className="label">Date:</div>
            <div className="value">
              {paymentDetails.created_at
                ? formatDate(paymentDetails.created_at)
                : formatDate(Date.now() / 1000)}
            </div>
          </div>
          <div className="inline-pair">
            <div className="label">Donor Name:</div>
            <div className="value">{donorDetails.name}</div>
            <div className="label">City:</div>
            <div className="value">{donorDetails.city || "-"}</div>
          </div>
          <div className="inline-pair">
            <div className="label">Phone (WhatsApp):</div>
            <div className="value">{donorDetails.whatsapp}</div>
            <div className="label">PAN:</div>
            <div className="value">{donorDetails.pan || "-"}</div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Transaction Details</div>
          <div className="donor-info">
            <div className="label">Payment Ref:</div>
            <div className="value">{paymentDetails.razorpay_payment_id}</div>
            <div className="label">Bank Name:</div>
            <div className="value">Razorpay Payment Gateway</div>
            <div className="label">Purpose:</div>
            <div className="value">Donation</div>
            <div className="label">Transaction ID:</div>
            <div className="value">{transactionId}</div>
          </div>
        </div>

        <div className="amount-80g-row">
          <div className="amount-section">
            <div className="amount-fields">
              <div className="amount-row">
                <div className="amount-label">Amount in Rupees:</div>
                <div className="amount-value amount-number">
                  ₹ {amountValue.toFixed(2)}
                </div>
              </div>
              <div className="amount-row">
                <div className="amount-label">Amount in Words:</div>
                <div className="amount-value">{amountInWords}</div>
              </div>
            </div>
          </div>

          <div className="certification">
            <div className="section-title">80G Tax Exemption</div>

            <div className="donor-info">
              <div className="label">Reg. No:</div>
              <div className="value">ABQCS3285BF20251</div>

              <div className="label">Dated:</div>
              <div className="value">17-06-2025</div>

              <div className="label">Approval Under:</div>
              <div className="value">
                12-Sub-clause (A) of clause (iv) of first proviso to sub-section
                (5) of section 80G
              </div>
            </div>
          </div>
        </div>

        <div className="signature">
          <div className="signature-line"></div>
          <div>Authorized Signatory</div>
          <div>Sarvarthasiddhi Foundation</div>
        </div>

        <div className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-title">Registered Office</div>
              <div className="footer-value">Old Idgah Colony</div>
              <div className="footer-value">Agra, UP</div>
            </div>
            <div>
              <div className="footer-title">Contact Information</div>
              <div className="footer-value">Phone: +91 97594 97594</div>
              <div className="footer-value">
                Email: sarvarthasiddhifoundation@gmail.com
              </div>
            </div>
          </div>
          <div className="note">This is a computer generated receipt.</div>
        </div>
      </div>

      <div className="receipt-actions">
        <button onClick={handleDownload} className="download-btn">
          Download Receipt PDF
        </button>

        <a
          href={`https://wa.me/${
            donorDetails.whatsapp
          }?text=${encodeURIComponent(
            `🙏 Thank you for your donation to Sarvarthasiddhi Foundation!\n\nDownload your receipt here: https://yourdomain.com/receipt`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          Send Receipt on WhatsApp
        </a>
      </div>
    </>
  );
}

export default Receipt;

// Generates a receipt number in format 10YYYYMMNNN
function generateReceiptNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const serial = Math.floor(Math.random() * 999 + 1)
    .toString()
    .padStart(3, "0");

  return `108-${year}/${month}-${serial}`;
}

// Formats UNIX timestamp to readable date
function formatDate(unixTimestamp) {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Converts integer amount into words
function convertAmountToWords(amount) {
  if (amount === undefined || amount === null || amount === "") return "-";
  if (isNaN(amount)) return "-";
  if (amount === 0) return "Zero Rupees Only";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const scales = ["", "Thousand", "Lakh", "Crore"];

  function convertChunk(num) {
    let str = "";

    if (num > 99) {
      str += units[Math.floor(num / 100)] + " Hundred ";
      num = num % 100;
    }

    if (num > 19) {
      str += tens[Math.floor(num / 10)] + " ";
      num = num % 10;
    }

    if (num > 0) {
      str += units[num] + " ";
    }

    return str.trim();
  }

  let result = "";
  let scaleIndex = 0;

  while (amount > 0) {
    let chunk;
    if (scaleIndex === 0) {
      chunk = amount % 1000;
      amount = Math.floor(amount / 1000);
    } else {
      chunk = amount % 100;
      amount = Math.floor(amount / 100);
    }

    if (chunk > 0) {
      let chunkWords = convertChunk(chunk);
      if (scaleIndex > 0 && scales[scaleIndex]) {
        chunkWords += " " + scales[scaleIndex];
      }
      result = chunkWords + " " + result;
    }
    scaleIndex++;
  }

  return result.trim() + " Rupees Only";
}
