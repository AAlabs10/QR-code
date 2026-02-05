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
        try {
          const parsed = JSON.parse(decodedText);
        if (isExpired(parsed.expirationDate)) {
         setStatus("❌ QR Code Expired");
          setScanResult(null);
         } else {
            const today = new Date();
            const exp = new Date(parsed.expirationDate + "T23:59:59");
            const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);
            setStatus(`✅ QR Code Valid — ${diff} day(s) left`);
            setStatus(
            `✅ QR Code Valid — ${diffHours}h ${diffMinutes}m left`
            )
             setScanResult(parsed);
             }


          scanner.clear(); // stop scanning after success
        } catch {
          setStatus("⚠️ Invalid QR Code");
        }
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
          <p><strong>Plate:</strong> {scanResult.plateNumber}</p>
          <p><strong>Expires:</strong> {scanResult.expirationDate}</p>
        </div>
      )}
    </div>
  );
}

export default QRScanner;
