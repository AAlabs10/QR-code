import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [status, setStatus] = useState("");

  const isExpired = (expDate) => {
    const today = new Date();
    const expiration = new Date(expDate + "T23:59:59"); 
    return today > expiration;
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        let parsedData = null;

        // 1️⃣ Try JSON (old format)
        try {
          parsedData = JSON.parse(decodedText);
        } catch {
          // 2️⃣ Fallback: text format
          if (decodedText.includes("Owner Name:")) {
            const lines = decodedText.split("\n");

            const extract = (label) =>
              lines.find(l => l.startsWith(label))?.split(":").slice(1).join(":").trim();

            parsedData = {
              ownerName: extract("Owner Name"),
              address: extract("Address"),
              phone: extract("Phone Number"),
              plateNumber: extract("Plate Number"),
              serialNumber: extract("Serial Number"),
              expirationDate: extract("Expiration Date"),
            };
          } else {
            setStatus("⚠️ Invalid QR Code");
            return;
          }
        }

        // 3️⃣ Expiration check
        if (!parsedData.expirationDate || isExpired(parsedData.expirationDate)) {
          setStatus("❌ QR Code Expired");
          setScanResult(null);
        } else {
          const today = new Date();
          const exp = new Date(parsedData.expirationDate + "T23:59:59");
          const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
          setStatus(`✅ QR Code Valid — ${diff} day(s) left`);
          setScanResult(parsedData);
        }

        scanner.clear();
      },
      (error) => {
        // silently ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scan QR Code</h2>

      <div id="qr-reader" style={{ width: "300px", margin: "auto" }} />

      <p>{status}</p>

      {scanResult && (
        <div>
          <p><strong>Name:</strong> {scanResult.ownerName}</p>
          <p><strong>Address:</strong> {scanResult.address}</p>
          <p><strong>Phone Number:</strong> {scanResult.phone}</p>
          <p><strong>Plate:</strong> {scanResult.plateNumber}</p>
          <p><strong>Serial Number:</strong> {scanResult.serialNumber}</p>
          <p><strong>Expires:</strong> {scanResult.expirationDate}</p>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
