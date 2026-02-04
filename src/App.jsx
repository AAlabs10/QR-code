import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import QRGenerator from "./component/QRGenerator";
import { QRCodeSVG } from "qrcode.react";
import QRScanner from "./part/QRScanner";

function App() {

  const downloadQR = () => {
  const canvas = document.querySelector("canvas");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  const downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qr-code.png";
  downloadLink.click();
};

  return (
    <div style={{ padding: 20 }}>
      {/* <h2>My QR Code</h2> */}

      {/* <QRCodeCanvas
        value="https://example.com"
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      /> */}
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/QRScanner" element={<QRScanner />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
