import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {
  const [text, setText] = useState("");

  // ✅ ADD THIS FUNCTION INSIDE THE COMPONENT
  const downloadQR = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      {text && (
        <>
          <QRCodeCanvas
            value={text}
            size={200}
            includeMargin
          />

          <br /><br />

          <button onClick={downloadQR}>
            Download QR Code
          </button>
        </>
      )}
    </div>
  );
}

export default QRGenerator;
