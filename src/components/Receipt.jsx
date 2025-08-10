import React from "react";
import "../styles/Receipt.css";
import { useLocation, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { useEffect, useState } from "react";

function Receipt() {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/donations/${id}`
        );
        setDonation(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!donation) return <p>Donation not found.</p>;

  // Generate receipt number
  const receiptNumber = generateReceiptNumber();

  // Safely parse amount
  const rawAmount = donation?.amount;
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
  // let transactionId = "-";
  // if (paymentDetails) {
  //   transactionId =
  //     paymentDetails.razorpay_payment_id;
  // }

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
          <div className="org-name">SARVARTHASIDDHI FOUNDATION</div>
          <div className="org-info">
            Registered under Section 8 of the Companies Act 2013
            <br />
            CIN: U94910UP2025NPL224635 <br />
            Niti Aayog reg.no. UP/2025/0653107 | Startup India reg. no. DIPP208872 <br />
            39/22A/1 Old Idgah Colony, Opp. Satsang Bhawan, Agra-282001, Uttar
            Pradesh, India <br /> Mobile: +91 97594 97594 | Email:
            sarvarthasiddhi@gmail.com
          </div>
        </div>

        <div className="green-strip">DONATION RECEIPT</div>

        <div className="donation-grid">
          <div className="left-col">
            <p>
              <strong>Receipt No.:</strong> {receiptNumber}
            </p>
            <p>
              <strong>Received from:</strong> {donation.name}{" "}
            </p>
            <p>
              <strong>Method: </strong>
              {donation.paymentDetails && donation.paymentDetails.vpa
                ? donation.paymentDetails.method + " - " + donation.paymentDetails.vpa
                : ""}
            </p>
            <p>
              <strong>Address:</strong> {donation.city || "-"}
            </p>
            {/* <p><strong>Email:</strong> -</p> */}
            <p>
              <strong>Amount:</strong> ₹{amountValue.toFixed(2)}
            </p>
          </div>
          <div className="right-col">
            <p>
              <strong>Date:</strong>{" "}
              {formatDate(donation.paymentDetails?.created_at || Date.now())}
            </p>
            <p>
              <strong>Contact No.:</strong> {donation.whatsapp}
            </p>
            <p>
              <strong>PAN :</strong> {donation.pan ? "PAN" : "-"}
            </p>
            <p>
              <strong>Transaction ID:</strong> {donation.paymentId}
            </p>
            <p>
              <strong>Purpose:</strong> {donation.purpose}
            </p>
          </div>
        </div>
        <p style={{ textAlign: "left", marginTop: "0", fontSize: "12.5px" }}>
              <strong style={{fontWeight: 600}}>In Words:</strong> {amountInWords}
            </p>

        <div className="tax-info">
          <p className="tax80G" style={{textAlign: 'center'}}>
            <strong>
              Eligble for deduction under section 80G of Income Tax Act 1961
            </strong>
          </p>
          <p>
            {/* Our Income Tax*/} Unique Registration No. u/s 12A:{" "} 
            <strong>ABQCS3285BE20251</strong> | Date: 17/06/2025
          </p>
          <p>
            Our Income Tax Registration No. u/s 80G(5):{" "}
            <strong>ABQCS3285BF20251</strong> | Date: 17/06/2025 | Validity Period: <strong>AY 2026–27 to AY 2027–28</strong>
          </p>
          <p>
            
          </p>
          <p>
            Our Income Tax PAN : <strong>ABQCS3285B</strong> | Our Income Tax
            TAN: <strong>AGSR23075D</strong>
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
          href={`https://wa.me/${donation.whatsapp}?text=${encodeURIComponent(
            `🙏 Thank you for your donation to Sarvarthasiddhi Foundation!\n\nDownload your receipt here: https://sarvarthasiddhi.org/receipt/${id}`
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
function formatDate(dateInput) {
  let date;
  if (typeof dateInput === "string") {
    date = new Date(dateInput); // ISO string
  } else if (typeof dateInput === "number" && dateInput < 1e12) {
    date = new Date(dateInput * 1000); // seconds
  } else {
    date = new Date(dateInput); // milliseconds
  }

  return date.toLocaleDateString("en-IN", {
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
