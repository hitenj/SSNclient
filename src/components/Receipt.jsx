import React from "react";
import "../styles/Receipt.css";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import html2pdf from "html2pdf.js";

function Receipt() {
  const location = useLocation();

  let donorDetails, paymentDetails, purpose;

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
  if (paymentDetails) {
    transactionId =
      paymentDetails.razorpay_payment_id;
  }

  const handleDownload = () => {
    const element = document.querySelector(".receipt");
    const opt = {
      margin: 0.3,
      filename: `Receipt-${receiptNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <div className="receipt">
        <img src={logo} className="background-logo" alt="logo" />
        <div className="header">
          <div className="org-name">SARVARTHA SIDDHI FOUNDATION</div>
          <div className="org-info">
            Registered under Section 8 of the Companies Act 2013
            <br />CIN: U94910UP2025NPL224635 <br />
            39/22A/1 Old Idgah Colony, Opp. Satsang Bhawan, Agra-282001, Uttar
            Pradesh, India <br />  Mobile: +91 97594
            97594 | Email: sarvarthasiddhi@gmail.com
          </div>
        </div>

        <div className="green-strip">DONATION RECEIPT</div>

        <div className="donation-grid">
          <div className="left-col">
            <p>
              <strong>Receipt No.:</strong> {receiptNumber}
            </p>
            <p>
              <strong>Received from:</strong> {donorDetails.name}
            </p>
            <p>
              <strong>Address:</strong> {donorDetails.city || "-"}
            </p>
            {/* <p><strong>Email:</strong> -</p> */}
            <p>
              <strong>Amount:</strong> ₹{amountValue.toFixed(2)}
            </p>
            <p>
              <strong>In Words:</strong> {amountInWords}
            </p>
          </div>
          <div className="right-col">
            <p>
              <strong>Date:</strong>{" "}
              {paymentDetails.created_at
                ? formatDate(paymentDetails.created_at)
                : formatDate(Date.now() / 1000)}
            </p>
            <p>
              <strong>Contact No.:</strong> {donorDetails.whatsapp}
            </p>
            <p>
              <strong>PAN :</strong> {donorDetails.pan ? "PAN" : "-"}
            </p>
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Purpose:</strong> {donorDetails.purpose}
            </p>
          </div>
        </div>

        <div className="tax-info">
          <p>
            <strong>
              Eligble for deduction under section 80G of Income Tax Act 1961
            </strong>
          </p>
          <p>
            Our Income Tax Registration No. u/s 80G(5):{" "}
            <strong>ABQCS3285BF20251</strong> | Date: 17/06/2025
          </p>
          <p>
            Validity Period: <strong>AY 2026–27 to AY 2027–28</strong>
          </p>
          <p>
            Our Income Tax PAN : <strong>ABQCS3285B</strong> | Our Income Tax
            TAN: <strong>AGSR23075D</strong>
          </p>
          <p>
            Our Income Tax Unique Registration No. u/s 12A:{" "}
            <strong>ABQCS3285BE20251</strong> | Date: 17/06/2025
          </p>
        </div>

        <div className="bank-details">
          <span>
            <strong>Bank:</strong> Axis Bank
          </span>
          <span>
            <strong>Account No.:</strong> 925010028006852
          </span>
          <span>
            <strong>Branch:</strong> Idgah Colony, Agra
          </span>
          <span>
            <strong>IFSC:</strong> UTIB0004369
          </span>
        </div>
        <div className="footer-note">
        <em>
          This is a system-generated receipt and does not require a physical
          signature.
        </em>
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
            `🙏 Thank you for your donation to Sarvarthasiddhi Foundation!\n\nDownload your receipt here: https://sarvarthasiddhi.org/receipt`
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

  const key = `receipt-serial-${year}-${month}`;
  let lastSerial = parseInt(localStorage.getItem(key) || "0", 10);
  lastSerial += 1;
  localStorage.setItem(key, lastSerial.toString());

  const serial = lastSerial.toString().padStart(3, "0");

  return `SSF${year}${month}${serial}`;
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
