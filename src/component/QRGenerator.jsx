import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {

  const bankDetails = `Account Name: Adetoyese Adeniran
Account Number: 9015723473
Bank: OPay`;

  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "Adetoyese-Bank-QR.png";
    downloadLink.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Scan to Transfer</h3>

      <QRCodeCanvas
        value={bankDetails}
        size={220}
        includeMargin
      />

      <br /><br />

      <button onClick={downloadQR}>
        Download QR Code
      </button>
    </div>
  );
}

export default QRGenerator;
